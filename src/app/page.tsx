import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import KeyStatsStrip from "@/components/home/KeyStatsStrip";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AcademicPrograms from "@/components/home/AcademicPrograms";
import FeaturedFacilities from "@/components/home/FeaturedFacilities";
import SchoolGallery from "@/components/home/SchoolGallery";
import LeadershipFacultyAndStudents from "@/components/home/LeadershipFacultyAndStudents";
import TriSection from "@/components/home/TriSection";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import FaqAndContact from "@/components/home/FaqAndContact";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getFaqJsonLd } from "@/lib/jsonld";
import { getSiteSettings } from "@/lib/siteSettings";

export const revalidate = 60; // ISR 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const schoolInfo = await prisma.schoolInfo.findFirst().catch(() => null);
  return constructMetadata({
    title: schoolInfo?.schoolName ? `${schoolInfo.schoolName} | Duty • Devotion • Discipline` : "Gidhaur Central School",
    description: schoolInfo?.tagline || "Gidhaur Central School (ESTD- 2005, Reg No. JAM/PR-29) in Gidhaur, Jamui (Bihar). Nurturing young minds through Duty, Devotion & Discipline.",
    canonical: "/",
  });
}

export default async function HomePage() {
  // Fetch dynamic content from Prisma
  const [
    schoolInfo,
    heroSlides,
    statCounters,
    aboutSection,
    whyChooseUsItems,
    academicPrograms,
    facilities,
    galleryImages,
    achievements,
    testimonials,
    newsList,
    faqs,
    principalMsg,
    directorMsg,
    facultyList,
  ] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.statCounter.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.aboutSection.findFirst().catch(() => null),
    prisma.whyChooseUsItem.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.academicProgram.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.facility.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.galleryImage.findMany({ take: 6, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.achievement.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
    prisma.news.findMany({ where: { isPublished: true }, orderBy: { publishDate: "desc" }, take: 4 }).catch(() => []),
    prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.principalMessage.findFirst().catch(() => null),
    prisma.directorMessage.findFirst().catch(() => null),
    prisma.facultyMember.findMany({ take: 4, orderBy: { order: "asc" } }).catch(() => []),
  ]);

  const siteSettings = getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Dynamic Navbar */}
      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section (Auto slider + optional floating stats box) */}
        <HeroSection
          slides={heroSlides}
          showHeroStats={siteSettings.showHeroStats}
        />

        {/* 2. Key Stats Strip (5 Pill Badges) */}
        <KeyStatsStrip stats={statCounters} />

        {/* 3. About Our School */}
        <AboutSection
          badge={aboutSection?.badge}
          title={aboutSection?.title}
          description={aboutSection?.description}
          imageUrl={aboutSection?.imageUrl}
          vision={aboutSection?.vision}
          mission={aboutSection?.mission}
          values={aboutSection?.values}
        />

        {/* 4. Leadership (Top Left) & Faculty (Top Right) & Student Reviews (Bottom) */}
        <LeadershipFacultyAndStudents
          principalMessage={principalMsg}
          directorMessage={directorMsg}
          facultyMembers={facultyList}
          studentTestimonials={testimonials}
        />

        {/* 5. Why Choose Us */}
        <WhyChooseUs items={whyChooseUsItems} />

        {/* 6. Academic Programs (5 Stages) */}
        <AcademicPrograms programs={academicPrograms} />

        {/* 7. Featured Facilities */}
        <FeaturedFacilities facilities={facilities} />

        {/* 8. School Gallery Preview */}
        <SchoolGallery images={galleryImages} />

        {/* 9. Tri-Section: Achievements | Testimonials | News & Events */}
        <TriSection
          achievements={achievements.filter(
            (a) =>
              a.category !== "Board Toppers" &&
              !a.studentName &&
              !(a.description && a.description.startsWith("PHOTO:"))
          )}
          testimonials={testimonials}
          newsList={newsList}
        />

        {/* 10. Admission Process 5-Steps */}
        <AdmissionProcess />

        {/* 11. FAQs & Get In Touch Form */}
        <FaqAndContact
          faqs={faqs}
          address={schoolInfo?.address}
          phone1={schoolInfo?.phone1}
          phone2={schoolInfo?.phone2}
          email={schoolInfo?.email}
          workingHours={schoolInfo?.workingHours}
        />
      </main>

      {/* Dynamic Footer with WhatsApp Chat Widget */}
      <Footer
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        facebookUrl={schoolInfo?.facebookUrl}
        instagramUrl={schoolInfo?.instagramUrl}
        youtubeUrl={schoolInfo?.youtubeUrl}
        linkedinUrl={schoolInfo?.linkedinUrl}
        whatsappNumber={schoolInfo?.whatsappNumber}
      />
    </div>
  );
}
