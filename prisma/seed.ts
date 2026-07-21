import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@dovesphere.com";
  const password = process.env.ADMIN_PASSWORD || "changeme";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: { email, passwordHash },
    });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  const existingForm = await prisma.form.findUnique({ where: { slug: "contact" } });
  if (!existingForm) {
    await prisma.form.create({
      data: {
        name: "Contact Us",
        slug: "contact",
        description: "General contact form for inquiries",
        fields: {
          create: [
            { label: "Name", fieldKey: "name", type: "text", required: true, placeholder: "Your full name", order: 0 },
            { label: "Email", fieldKey: "email", type: "email", required: true, placeholder: "your@email.com", order: 1 },
            { label: "Phone", fieldKey: "phone", type: "phone", required: false, placeholder: "+234 ...", order: 2 },
            { label: "Message", fieldKey: "message", type: "textarea", required: true, placeholder: "How can we help?", order: 3 },
          ],
        },
      },
    });
    console.log("Default 'Contact Us' form created");
  } else {
    console.log("Default 'Contact Us' form already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
