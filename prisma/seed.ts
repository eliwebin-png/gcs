import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding school database...");

  // 1. Admin account
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: { password: hashedPassword },
    create: {
      username: "admin",
      email: "admin@gidhaurcentralschool.com",
      password: hashedPassword,
      name: "Principal Administration",
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    },
  });

  await prisma.admin.upsert({
    where: { username: "gcs@admin" },
    update: { password: hashedPassword },
    create: {
      username: "gcs@admin",
      email: "admin@gcs.edu.in",
      password: hashedPassword,
      name: "GCS Administrator",
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    },
  });

  // 2. School Info
  await prisma.schoolInfo.deleteMany();
  await prisma.schoolInfo.create({
    data: {
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
      principalName: "Principal, GCS",
      directorName: "Director, GCS",
      establishedYear: "2005",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
      whatsappNumber: "+918409254393",
    },
  });

  // 3. Hero Slides
  await prisma.heroSlide.deleteMany();
  await prisma.heroSlide.createMany({
    data: [
      {
        badge: "Admissions Open 2025-26",
        heading: "Building Bright Futures Through Quality Education",
        subheading: "Empowering students through academic excellence, innovation, leadership, and values in a nurturing learning environment.",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
        primaryCtaText: "Apply Now",
        primaryCtaLink: "/admissions",
        secondaryCtaText: "Virtual Tour",
        secondaryCtaLink: "/infrastructure",
        order: 1,
        isActive: true,
      },
      {
        badge: "Ranked #1 School for Holistic Development",
        heading: "Nurturing Curious Minds, Shaping Global Leaders",
        subheading: "State-of-the-art infrastructure, international pedagogy, and world-class sports facilities for every student.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
        primaryCtaText: "Explore Academics",
        primaryCtaLink: "/academics",
        secondaryCtaText: "Contact Us",
        secondaryCtaLink: "/contact",
        order: 2,
        isActive: true,
      },
    ],
  });

  // 4. Stat Counters (5 key items shown in the screenshot)
  await prisma.statCounter.deleteMany();
  await prisma.statCounter.createMany({
    data: [
      {
        label: "Students",
        value: "2500+",
        iconName: "Users",
        colorClass: "blue",
        order: 1,
        isActive: true,
      },
      {
        label: "Teachers",
        value: "150+",
        iconName: "UserCheck",
        colorClass: "emerald",
        order: 2,
        isActive: true,
      },
      {
        label: "Years of Excellence",
        value: "20+",
        iconName: "Trophy",
        colorClass: "amber",
        order: 3,
        isActive: true,
      },
      {
        label: "Board Results",
        value: "100%",
        iconName: "Medal",
        colorClass: "purple",
        order: 4,
        isActive: true,
      },
      {
        label: "Smart Classrooms",
        value: "50+",
        iconName: "Monitor",
        colorClass: "rose",
        order: 5,
        isActive: true,
      },
    ],
  });

  // 5. About Section
  await prisma.aboutSection.deleteMany();
  await prisma.aboutSection.create({
    data: {
      badge: "ABOUT OUR SCHOOL",
      title: "Gidhaur Central School - Duty, Devotion & Discipline",
      description: "At Gidhaur Central School, established in 2005 in Gidhaur, Jamui (Bihar), we believe in nurturing young minds with foundational academic excellence, moral integrity, and character building. Guided by our motto 'Duty • Devotion • Discipline', we prepare students for a bright and purposeful future.",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
      vision: "To cultivate intellectually vibrant, morally upright, and socially responsible citizens through accessible quality education.",
      mission: "To provide an enriching learning environment that fosters academic curiosity, ethical values, and holistic physical development.",
      values: "Duty, Devotion, Discipline, Integrity, and Compassion guide everything we do.",
      yearsExp: "20+",
    },
  });

  // 6. Why Choose Us (8 grid cards)
  await prisma.whyChooseUsItem.deleteMany();
  await prisma.whyChooseUsItem.createMany({
    data: [
      { title: "Smart Classrooms", description: "Digitally equipped interactive whiteboards & smart projectors.", iconName: "Tv", colorTheme: "blue", order: 1 },
      { title: "Experienced Faculty", description: "Highly qualified educators with dedication to student success.", iconName: "GraduationCap", colorTheme: "emerald", order: 2 },
      { title: "Digital Learning", description: "Blended LMS learning environment with modern STEM tools.", iconName: "Laptop", colorTheme: "cyan", order: 3 },
      { title: "Safe & Secure Campus", description: "24x7 CCTV surveillance, verified staff & robust entry safety.", iconName: "ShieldCheck", colorTheme: "green", order: 4 },
      { title: "Sports Facilities", description: "Multi-sport synthetic grounds, swimming pool & indoor arena.", iconName: "Dumbbell", colorTheme: "rose", order: 5 },
      { title: "Science & Computer Labs", description: "Advanced physics, chemistry, biology and high-tech AI robotics labs.", iconName: "Microscope", colorTheme: "indigo", order: 6 },
      { title: "Well Stocked Library", description: "Over 20,000+ volumes, reading halls and digital research e-library.", iconName: "BookOpen", colorTheme: "amber", order: 7 },
      { title: "GPS Enabled Transportation", description: "Air-conditioned bus fleet with real-time GPS tracking & female attendants.", iconName: "Bus", colorTheme: "orange", order: 8 },
    ],
  });

  // 7. Academic Programs (5 levels)
  await prisma.academicProgram.deleteMany();
  await prisma.academicProgram.createMany({
    data: [
      {
        title: "Pre Primary",
        ageGroup: "Age 2.5 - 5 Years",
        description: "Fun-filled learning with care and individual attention.",
        slug: "pre-primary",
        iconImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=400&auto=format&fit=crop",
        curriculum: "Play-way and Montessori-inspired experiential method.",
        eligibility: "Age 2.5+ as on March 31st of the academic year.",
        order: 1,
      },
      {
        title: "Primary",
        ageGroup: "Grade I - V",
        description: "Building strong foundations in academics & values.",
        slug: "primary",
        iconImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop",
        curriculum: "CBSE foundational curriculum with English, Math, Science, Social, Hindi & French.",
        eligibility: "Successful completion of kindergarten or equivalent.",
        order: 2,
      },
      {
        title: "Middle School",
        ageGroup: "Grade VI - VIII",
        description: "Encouraging curiosity, creativity and critical thinking.",
        slug: "middle-school",
        iconImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&auto=format&fit=crop",
        curriculum: "Integrated Science & Coding, Robotics, Humanities, and Language mastery.",
        eligibility: "Clear transfer certificate and academic report card of Grade V.",
        order: 3,
      },
      {
        title: "Secondary",
        ageGroup: "Grade IX - X",
        description: "Preparing students for board exams and future challenges.",
        slug: "secondary",
        iconImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
        curriculum: "Rigorous CBSE Board syllabus with regular mock evaluations and career counseling.",
        eligibility: "Passing Grade VIII with minimum qualifying criteria.",
        order: 4,
      },
      {
        title: "Senior Secondary",
        ageGroup: "Grade XI - XII",
        description: "Stream based education to shape successful careers.",
        slug: "senior-secondary",
        iconImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=400&auto=format&fit=crop",
        curriculum: "Science (PCM/PCB), Commerce, and Humanities with integrated NEET/JEE & CUET coaching.",
        eligibility: "CBSE or recognized board Grade X results with required stream cutoffs.",
        order: 5,
      },
    ],
  });

  // 8. Featured Facilities (8 cards)
  await prisma.facility.deleteMany();
  await prisma.facility.createMany({
    data: [
      { title: "Computer Lab", description: "Latest Core i7 systems, high-speed fiber internet and AI tools.", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop", iconName: "Monitor", order: 1 },
      { title: "Science Lab", description: "Fully equipped Physics, Chemistry & Biology research stations.", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop", iconName: "FlaskConical", order: 2 },
      { title: "Robotics Lab", description: "Hands-on maker space for IoT, 3D printing & Arduino kits.", imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop", iconName: "Cpu", order: 3 },
      { title: "Library", description: "Quiet reading zones, digital reference catalogs & study carrels.", imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop", iconName: "BookOpen", order: 4 },
      { title: "Sports Ground", description: "Full-sized football turf, athletic track & basketball courts.", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", iconName: "Trophy", order: 5 },
      { title: "Music Room", description: "Acoustically treated studio with western & classical instruments.", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", iconName: "Music", order: 6 },
      { title: "Art Studio", description: "Bright creative space for painting, sculpture, and design.", imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop", iconName: "Palette", order: 7 },
      { title: "Cafeteria", description: "Hygienic, nutritionist-approved fresh hot meals & snacks.", imageUrl: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=600&auto=format&fit=crop", iconName: "Coffee", order: 8 },
    ],
  });

  // 9. Gallery Categories & Images
  await prisma.galleryImage.deleteMany();
  await prisma.galleryCategory.deleteMany();

  const catCampus = await prisma.galleryCategory.create({
    data: { name: "Campus & Infrastructure", slug: "campus" },
  });
  const catAcademics = await prisma.galleryCategory.create({
    data: { name: "Academic Life", slug: "academics" },
  });
  const catEvents = await prisma.galleryCategory.create({
    data: { name: "Events & Celebrations", slug: "events" },
  });
  const catSports = await prisma.galleryCategory.create({
    data: { name: "Sports & Athletics", slug: "sports" },
  });

  await prisma.galleryImage.createMany({
    data: [
      {
        title: "Classroom Learning",
        caption: "Interactive smart learning sessions in high school.",
        imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
        categoryId: catAcademics.id,
        isFeatured: true,
      },
      {
        title: "Annual Day",
        caption: "Vibrant dance performances during the Annual Day gala.",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        categoryId: catEvents.id,
        isFeatured: true,
      },
      {
        title: "Sports Day",
        caption: "Students competing in 400m relay sprint championship.",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
        categoryId: catSports.id,
        isFeatured: true,
      },
      {
        title: "Science Exhibition",
        caption: "Young innovators presenting working solar models.",
        imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop",
        categoryId: catAcademics.id,
        isFeatured: true,
      },
      {
        title: "Cultural Activities",
        caption: "Traditional folk drama and musical orchestra.",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
        categoryId: catEvents.id,
        isFeatured: true,
      },
      {
        title: "Our Campus",
        caption: "Scenic aerial view of our expansive green campus.",
        imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop",
        categoryId: catCampus.id,
        isFeatured: true,
      },
    ],
  });

  // 10. Achievements (Star Students & School Accolades)
  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({
    data: [
      // Star Students (Category: Board Toppers)
      {
        title: "Rohan Mehta",
        subtitle: "Class XII (Science)",
        description: "PHOTO:https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "emerald",
        iconName: "School Topper & District Rank 1",
        year: "98.8%",
        studentName: "Rohan Mehta",
        order: 1,
      },
      {
        title: "Ananya Gupta",
        subtitle: "Class X (Board)",
        description: "PHOTO:https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "teal",
        iconName: "State Rank 3 • 100/100 in Maths",
        year: "99.2%",
        studentName: "Ananya Gupta",
        order: 2,
      },
      {
        title: "Arjun Patel",
        subtitle: "Class XII (Commerce)",
        description: "PHOTO:https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "amber",
        iconName: "District Rank 2 • 100 in Economics",
        year: "97.6%",
        studentName: "Arjun Patel",
        order: 3,
      },
      {
        title: "Sanya Kapoor",
        subtitle: "Class XII (Humanities)",
        description: "PHOTO:https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "rose",
        iconName: "Stream Topper • 100 in Psychology",
        year: "98.2%",
        studentName: "Sanya Kapoor",
        order: 4,
      },
      {
        title: "Devansh Singh",
        subtitle: "Class X (Board)",
        description: "PHOTO:https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "blue",
        iconName: "Gold Medalist in Science Olympiad",
        year: "98.4%",
        studentName: "Devansh Singh",
        order: 5,
      },
      {
        title: "Ishita Rao",
        subtitle: "Class XII (Science)",
        description: "PHOTO:https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
        category: "Board Toppers",
        iconColor: "purple",
        iconName: "National Cyber Olympiad Silver",
        year: "97.8%",
        studentName: "Ishita Rao",
        order: 6,
      },

      // School Institutional Accolades
      {
        title: "100% Board Result",
        subtitle: "Consistent excellent results for the past many years.",
        description: "All 240 candidates passed with distinction and first divisions in CBSE Class X & XII.",
        category: "Academics",
        iconColor: "emerald",
        iconName: "Award",
        year: "2024-25",
        order: 7,
      },
      {
        title: "National Level Competitions",
        subtitle: "Winners in various national level competitions.",
        description: "1st Prize at National Youth Robotics Olympiad & National Debate Conclave.",
        category: "Competitions",
        iconColor: "teal",
        iconName: "Trophy",
        year: "2024",
        order: 8,
      },
      {
        title: "Sports Championships",
        subtitle: "Multiple titles in district, state and national events.",
        description: "Gold medals in CBSE National Athletics, U-17 Basketball and Football tournaments.",
        category: "Sports",
        iconColor: "amber",
        iconName: "Flame",
        year: "2024-25",
        order: 9,
      },
      {
        title: "Olympiad Winners",
        subtitle: "Outstanding performance in Science, Maths & More.",
        description: "18 International Rank 1 Gold Medalists in IMO, NSO, and IEO competitions.",
        category: "Institutional Olympiads",
        iconColor: "rose",
        iconName: "Medal",
        year: "2024",
        order: 10,
      },
    ],
  });

  // 11. Testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Mrs. Neha Sharma",
        role: "Parent of Grade VI Student",
        message: "The school provides the perfect balance of academics and activities. My child has grown more confident and independent with every passing year.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        order: 1,
      },
      {
        name: "Arjun Verma",
        role: "Grade VIII Student",
        message: "Teachers are very supportive and friendly. I love the learning environment here, especially the robotics lab and football coaching!",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
        order: 2,
      },
      {
        name: "Mr. Rajiv Malhotra",
        role: "Parent of Grade X Student",
        message: "Best school with excellent facilities and caring staff. Highly recommended! The personalized attention helped my daughter top her grade.",
        rating: 5,
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        order: 3,
      },
    ],
  });

  // 12. News
  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      {
        title: "Admissions Open 2025-26",
        slug: "admissions-open-2025-26",
        summary: "Secure your child's bright future with quality holistic education.",
        content: "Applications are now invited for admissions to Nursery through Grade XI for the upcoming academic session 2025-26. We encourage parents to fill out the online registration form or visit our campus for a personalized counseling tour.",
        thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
        publishDate: new Date("2025-05-15"),
        author: "Admissions Office",
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Annual Function 2025",
        slug: "annual-function-2025",
        summary: "A grand celebration of student talent, creativity and milestones.",
        content: "Our 30th Annual Day Celebration, 'Vibrant Echoes', was graced by esteemed dignitaries. Over 800 students showcased spellbinding music, theatrical drama, and classical dance performances before a packed audience of proud parents.",
        thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
        publishDate: new Date("2025-05-10"),
        author: "Cultural Committee",
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "SCIENCE FAIR 2025",
        slug: "science-fair-2025",
        summary: "Innovation and creativity on display with 120+ working STEM exhibits.",
        content: "Students from Grades VI to XII demonstrated cutting-edge science projects ranging from automated drone delivery systems to sustainable bio-plastic models. Renowned university professors judged the innovative prototypes.",
        thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600&auto=format&fit=crop",
        publishDate: new Date("2025-04-28"),
        author: "Science Department",
        isPublished: true,
        isFeatured: true,
      },
      {
        title: "Inter-School Sports Meet",
        slug: "inter-school-sports-meet",
        summary: "Excellence in sports continues as our champions lift the overall trophy.",
        content: "Our school athletic team bagged the overall championship trophy at the State Inter-School Sports Meet, winning 14 Gold, 8 Silver, and 6 Bronze medals across track, field, and swimming disciplines.",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
        publishDate: new Date("2025-04-20"),
        author: "Sports Department",
        isPublished: true,
        isFeatured: true,
      },
    ],
  });

  // 13. Events
  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: [
      {
        title: "Annual Sports Carnival 2025",
        slug: "annual-sports-carnival-2025",
        description: "Join us for 3 days of high-energy athletic tournaments, track and field races, and parent-teacher friendly matches.",
        thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
        location: "Main Sports Complex & Track",
        eventDate: new Date("2025-11-20"),
        time: "08:30 AM - 04:00 PM",
        status: "UPCOMING",
        isFeatured: true,
      },
      {
        title: "National Robotics Championship",
        slug: "national-robotics-championship",
        description: "Inter-school AI & robotics showdown featuring obstacle course rovers, line-followers, and battle bots.",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
        location: "STEM Innovation Hub",
        eventDate: new Date("2025-12-05"),
        time: "10:00 AM - 03:30 PM",
        status: "UPCOMING",
        isFeatured: true,
      },
    ],
  });

  // 14. Notices
  await prisma.notice.deleteMany();
  await prisma.notice.createMany({
    data: [
      {
        title: "CBSE Board Examination Date Sheet for Class X & XII (2025-26)",
        description: "The official timetable for upcoming board examinations has been released by CBSE. Download the PDF schedule.",
        fileUrl: "#",
        category: "Examination",
        isPinned: true,
        publishDate: new Date(),
      },
      {
        title: "Parent-Teacher Meeting (PTM) for Term 1 Evaluations",
        description: "PTM will be conducted on Saturday, 10th from 8:30 AM to 1:00 PM. Parents are requested to adhere to their allotted slots.",
        fileUrl: "#",
        category: "Academics",
        isPinned: true,
        publishDate: new Date(),
      },
      {
        title: "Winter Break Notification & School Reopening Schedule",
        description: "The school will observe winter vacations from Dec 24 to Jan 2. Regular classes resume on Jan 3.",
        fileUrl: "#",
        category: "Holiday",
        isPinned: false,
        publishDate: new Date(),
      },
    ],
  });

  // 15. FAQs
  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({
    data: [
      {
        question: "What curriculum does the school follow?",
        answer: "We follow the CBSE (Central Board of Secondary Education) curriculum from Pre-Primary through Grade XII, enriched with international pedagogy, experiential STEM labs, and holistic co-curricular modules.",
        category: "Academics",
        order: 1,
      },
      {
        question: "How can I apply for admission?",
        answer: "You can easily apply online by clicking the 'Apply Now' button on our website to fill the online registration form. Alternatively, parents can visit our admissions desk Monday through Saturday between 8:00 AM and 4:00 PM.",
        category: "Admissions",
        order: 2,
      },
      {
        question: "Is transportation available across the city?",
        answer: "Yes, we operate a large fleet of modern GPS-tracked, air-conditioned buses equipped with CCTV cameras, speed governors, first aid kits, and verified female attendants covering all major routes.",
        category: "Facilities",
        order: 3,
      },
      {
        question: "Are there hostel or day-boarding facilities?",
        answer: "Yes, we provide premium Day Boarding with nutritious dining, evening supervised study clinics, homework completion support, and specialized professional sports coaching.",
        category: "Facilities",
        order: 4,
      },
      {
        question: "What are the regular school timings?",
        answer: "Pre-Primary (Nursery & KG): 8:30 AM - 12:30 PM | Primary & Middle (Grades I to VIII): 8:00 AM - 2:30 PM | Secondary & Senior Secondary (Grades IX to XII): 8:00 AM - 3:00 PM.",
        category: "General",
        order: 5,
      },
    ],
  });

  // 16. Principal & Director Messages
  await prisma.principalMessage.deleteMany();
  await prisma.principalMessage.create({
    data: {
      principalName: "Principal, GCS",
      qualification: "M.Sc., M.Ed., Educational Leadership",
      message: "Welcome to Gidhaur Central School! Established in 2005 in Gidhaur, Jamui (Bihar), our endeavor has been to kindle the fire of curiosity, build ethical foundations, and foster excellence in every child under our core motto 'Duty • Devotion • Discipline'. We nurture thinkers, innovators, and empathetic human beings who lead the world with confidence and compassion.",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
    },
  });

  await prisma.directorMessage.deleteMany();
  await prisma.directorMessage.create({
    data: {
      directorName: "Director, GCS",
      designation: "Managing Director & Trustee",
      message: "Education is not merely about accumulating degrees; it is the harmonious training of head, heart, and hands. Our vision at Gidhaur Central School is to provide quality infrastructure and holistic pedagogy while keeping timeless Indian values at the core of learning.",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
    },
  });

  // 17. Faculty Members
  await prisma.facultyMember.deleteMany();
  await prisma.facultyMember.createMany({
    data: [
      {
        name: "Dr. Arvind K. Saxena",
        designation: "HOD Science & PGT Physics",
        department: "Science",
        qualification: "Ph.D. in Physics, M.Sc., B.Ed.",
        experience: "18+ Years",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        email: "arvind.physics@gidhaurcentralschool.com",
        order: 1,
      },
      {
        name: "Mrs. Meenakshi Sundaram",
        designation: "HOD Mathematics & PGT Math",
        department: "Mathematics",
        qualification: "M.Sc. Mathematics, B.Ed.",
        experience: "15+ Years",
        photoUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=300&auto=format&fit=crop",
        email: "meenakshi.math@gidhaurcentralschool.com",
        order: 2,
      },
      {
        name: "Mr. David Robinson",
        designation: "PGT English & Literary Club Mentor",
        department: "Humanities",
        qualification: "M.A. English Literature, CELTA",
        experience: "12+ Years",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
        email: "david.robinson@gidhaurcentralschool.com",
        order: 3,
      },
      {
        name: "Mrs. Kavita Roy",
        designation: "Head of Primary Wing (PRT Coordinator)",
        department: "Primary",
        qualification: "M.A. Child Psychology, B.Ed.",
        experience: "14+ Years",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop",
        email: "kavita.roy@gidhaurcentralschool.com",
        order: 4,
      },
    ],
  });

  // 18. Download Items
  await prisma.downloadItem.deleteMany();
  await prisma.downloadItem.createMany({
    data: [
      { title: "School Prospectus & Information Brochure 2025-26", category: "Prospectus", fileUrl: "/downloads/prospectus.pdf", fileSize: "4.8 MB", fileType: "PDF" },
      { title: "Admission Registration Form & Checklist", category: "Admission Form", fileUrl: "/downloads/admission-form.pdf", fileSize: "1.2 MB", fileType: "PDF" },
      { title: "Annual Academic Calendar & Holiday List (2025-26)", category: "Holiday List", fileUrl: "/downloads/holiday-list.pdf", fileSize: "850 KB", fileType: "PDF" },
      { title: "CBSE Syllabus & Curriculum Outline (Grades IX - XII)", category: "Syllabus", fileUrl: "/downloads/syllabus.pdf", fileSize: "3.2 MB", fileType: "PDF" },
      { title: "Uniform, Books & Stationery Guidelines", category: "Circulars", fileUrl: "/downloads/guidelines.pdf", fileSize: "1.1 MB", fileType: "PDF" },
    ],
  });

  // 19. Mandatory Disclosures
  await prisma.mandatoryDisclosure.deleteMany();
  await prisma.mandatoryDisclosure.createMany({
    data: [
      { title: "Copies of Affiliation / Upgradation Letter and Recent Extension of Affiliation", documentNo: "CBSE/AFF/EX-0242", fileUrl: "#", category: "Documents & Information" },
      { title: "Copies of Societies / Trust / Company Registration / Renewal Certificate", documentNo: "REG/DEL/9812-B", fileUrl: "#", category: "Documents & Information" },
      { title: "Copy of No Objection Certificate (NOC) Issued by State Govt.", documentNo: "NOC/EDU/2024/71", fileUrl: "#", category: "Documents & Information" },
      { title: "Copies of Recognition Certificate under RTE Act, 2009", documentNo: "RTE/REC/88219", fileUrl: "#", category: "Documents & Information" },
      { title: "Building Safety Certificate as per National Building Code", documentNo: "PWD/BLD/9924", fileUrl: "#", category: "Staff & Infrastructure" },
      { title: "Fire Safety Certificate Issued by Competent Authority", documentNo: "FIRE/NOC/2025/11", fileUrl: "#", category: "Staff & Infrastructure" },
      { title: "Water, Health and Sanitation Certificates", documentNo: "MCD/HLT/SAN/52", fileUrl: "#", category: "Staff & Infrastructure" },
      { title: "Fee Structure of the School (Session 2025-26)", documentNo: "SCH/FEE/2025", fileUrl: "#", category: "Results & Academics" },
      { title: "Annual Academic Calendar & List of School Management Committee (SMC)", documentNo: "SMC/2025-26", fileUrl: "#", category: "Results & Academics" },
    ],
  });

  console.log("Database seeded successfully with all mock models!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
