import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating School details to Gidhaur Central School...");

  // 1. Update School Info
  const existingInfo = await prisma.schoolInfo.findFirst();

  const data = {
    schoolName: "Gidhaur Central School",
    tagline: "Duty • Devotion • Discipline",
    logoUrl: "/images/gidhaur-logo.png",
    phone1: "+91 8409254393",
    phone2: "+91 9934485443",
    email: "info@gidhaurcentralschool.com",
    admissionEmail: "admissions@gidhaurcentralschool.com",
    address: "Vill- Gidhaur, Post- Gidhaur, Dist- Jamui - Pin: 811305, Jamui, Bihar",
    workingHours: "Mon - Sat: 8:00 AM - 3:30 PM",
    affiliationBoard: "Reg No. JAM/PR-29 (ESTD- 2005)",
    affiliationNo: "JAM/PR-29",
    schoolCode: "JAM-29",
    establishedYear: "2005",
    whatsappNumber: "+918409254393",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  };

  if (existingInfo) {
    await prisma.schoolInfo.update({
      where: { id: existingInfo.id },
      data,
    });
  } else {
    await prisma.schoolInfo.create({
      data,
    });
  }

  // 2. Update About Section
  const existingAbout = await prisma.aboutSection.findFirst();
  const aboutData = {
    badge: "ABOUT OUR SCHOOL",
    title: "Gidhaur Central School - Duty, Devotion & Discipline",
    description:
      "At Gidhaur Central School, established in 2005 in Gidhaur, Jamui (Bihar), we believe in nurturing young minds with foundational academic excellence, moral integrity, and character building. Guided by our motto 'Duty • Devotion • Discipline', we prepare students for a bright and purposeful future.",
    vision: "To cultivate intellectually vibrant, morally upright, and socially responsible citizens through accessible quality education.",
    mission: "To provide an enriching learning environment that fosters academic curiosity, ethical values, and holistic physical development.",
    values: "Duty, Devotion, Discipline, Integrity, and Compassion guide everything we do.",
    yearsExp: "20+",
  };

  if (existingAbout) {
    await prisma.aboutSection.update({
      where: { id: existingAbout.id },
      data: aboutData,
    });
  } else {
    await prisma.aboutSection.create({
      data: {
        ...aboutData,
        imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
      },
    });
  }

  // 3. Update Stat Counter (Years of Excellence)
  await prisma.statCounter.updateMany({
    where: { label: { contains: "Years" } },
    data: { value: "20+" },
  });

  console.log("School details successfully updated to Gidhaur Central School in Neon DB!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
