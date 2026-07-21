"use client";

import { useEffect, useState } from "react";
import type { FormDefinition, SubmissionData } from "@/types";

export default function AdminSubmissionsPage() {
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>("");
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setForms(list);
        if (list.length > 0) setSelectedFormId(list[0].id);
        setLoadingForms(false);
      })
      .catch(() => setLoadingForms(false));
  }, []);

  useEffect(() => {
    if (!selectedFormId) return;
    let cancelled = false;
    fetch(`/api/forms/manage/${selectedFormId}/submissions`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setSubmissions(Array.isArray(data) ? data : []);
          setLoadingSubmissions(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadingSubmissions(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedFormId]);

  const handleExport = () => {
    if (!selectedFormId) return;
    window.open(`/api/forms/manage/${selectedFormId}/submissions/export`, "_blank");
  };

  const selectedForm = forms.find((f) => f.id === selectedFormId);

  if (loadingForms) {
    return <p className="text-gunmetal">Loading...</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-obsidian">Submissions</h1>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-obsidian">Select Form</label>
          <select
            value={selectedFormId}
            onChange={(e) => {
              setSelectedFormId(e.target.value);
              setLoadingSubmissions(true);
            }}
            className="rounded-md border border-gunmetal/20 bg-white px-3 py-2 text-sm text-obsidian focus:border-azure focus:outline-none focus:ring-1 focus:ring-azure"
          >
            {forms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={!selectedFormId}
          className="rounded-md bg-obsidian px-4 py-2 text-sm font-medium text-white hover:bg-gunmetal disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      {loadingSubmissions ? (
        <p className="text-gunmetal">Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <div className="rounded-lg border border-gunmetal/10 bg-white p-8 text-center text-gunmetal">
          No submissions for this form yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gunmetal/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-chalk">
              <tr>
                {selectedForm?.fields.map((f) => (
                  <th key={f.fieldKey} className="px-4 py-3 font-semibold text-obsidian whitespace-nowrap">
                    {f.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold text-obsidian whitespace-nowrap">Date</th>
                <th className="px-4 py-3 font-semibold text-obsidian whitespace-nowrap">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gunmetal/10">
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  {selectedForm?.fields.map((f) => (
                    <td key={f.fieldKey} className="px-4 py-3 text-gunmetal whitespace-nowrap">
                      {String(sub.data[f.fieldKey] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-gunmetal whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gunmetal whitespace-nowrap">{sub.ipAddress ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
