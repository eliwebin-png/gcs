"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- School Info & Settings ---
export async function updateSchoolInfoAction(data: {
  schoolName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  email: string;
  admissionEmail: string;
  address: string;
  workingHours: string;
  affiliationBoard: string;
  affiliationNo: string;
  schoolCode: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  whatsappNumber: string;
}) {
  try {
    const existing = await prisma.schoolInfo.findFirst();
    if (existing) {
      await prisma.schoolInfo.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.schoolInfo.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating school info:", error);
    return { success: false, error: "Failed to update school info." };
  }
}

// --- Hero Slides ---
export async function createHeroSlideAction(data: {
  badge: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  isActive: boolean;
  order: number;
}) {
  try {
    await prisma.heroSlide.create({ data });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create slide." };
  }
}

export async function updateHeroSlideAction(id: string, data: Partial<{
  badge: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  isActive: boolean;
  order: number;
}>) {
  try {
    await prisma.heroSlide.update({ where: { id }, data });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update slide." };
  }
}

export async function deleteHeroSlideAction(id: string) {
  try {
    await prisma.heroSlide.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete slide." };
  }
}

// --- About Section & Messages ---
export async function updateAboutSectionAction(data: {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  vision: string;
  mission: string;
  values: string;
  yearsExp: string;
}) {
  try {
    const existing = await prisma.aboutSection.findFirst();
    if (existing) {
      await prisma.aboutSection.update({ where: { id: existing.id }, data });
    } else {
      await prisma.aboutSection.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update about section." };
  }
}

export async function updatePrincipalMessageAction(data: {
  principalName: string;
  qualification: string;
  message: string;
  photoUrl: string;
}) {
  try {
    const existing = await prisma.principalMessage.findFirst();
    if (existing) {
      await prisma.principalMessage.update({ where: { id: existing.id }, data });
    } else {
      await prisma.principalMessage.create({ data });
    }
    revalidatePath("/principal-message");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update principal message." };
  }
}

export async function updateDirectorMessageAction(data: {
  directorName: string;
  designation: string;
  message: string;
  photoUrl: string;
}) {
  try {
    const existing = await prisma.directorMessage.findFirst();
    if (existing) {
      await prisma.directorMessage.update({ where: { id: existing.id }, data });
    } else {
      await prisma.directorMessage.create({ data });
    }
    revalidatePath("/director-message");
    revalidatePath("/admin/about");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update director message." };
  }
}

// --- Stat Counters ---
export async function updateStatCounterAction(id: string, data: {
  label: string;
  value: string;
  iconName: string;
  colorClass: string;
  order: number;
}) {
  try {
    await prisma.statCounter.update({ where: { id }, data });
    revalidatePath("/");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update stat counter." };
  }
}

export async function createStatCounterAction(data: {
  label: string;
  value: string;
  iconName: string;
  colorClass: string;
  order: number;
}) {
  try {
    await prisma.statCounter.create({ data });
    revalidatePath("/");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create stat counter." };
  }
}

export async function deleteStatCounterAction(id: string) {
  try {
    await prisma.statCounter.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/stats");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete stat counter." };
  }
}

// --- Academic Programs ---
export async function saveAcademicProgramAction(data: {
  id?: string;
  title: string;
  ageGroup: string;
  description: string;
  iconImage: string;
  slug: string;
  curriculum?: string;
  eligibility?: string;
  order: number;
}) {
  try {
    if (data.id) {
      await prisma.academicProgram.update({
        where: { id: data.id },
        data: {
          title: data.title,
          ageGroup: data.ageGroup,
          description: data.description,
          iconImage: data.iconImage,
          slug: data.slug,
          curriculum: data.curriculum,
          eligibility: data.eligibility,
          order: data.order,
        },
      });
    } else {
      await prisma.academicProgram.create({
        data: {
          title: data.title,
          ageGroup: data.ageGroup,
          description: data.description,
          iconImage: data.iconImage,
          slug: data.slug,
          curriculum: data.curriculum,
          eligibility: data.eligibility,
          order: data.order,
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/academics");
    revalidatePath("/admin/programs");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save program." };
  }
}

export async function deleteAcademicProgramAction(id: string) {
  try {
    await prisma.academicProgram.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/academics");
    revalidatePath("/admin/programs");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete program." };
  }
}

// --- Facilities ---
export async function saveFacilityAction(data: {
  id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  iconName?: string;
  order: number;
  isFeatured: boolean;
}) {
  try {
    if (data.id) {
      await prisma.facility.update({ where: { id: data.id }, data });
    } else {
      await prisma.facility.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/infrastructure");
    revalidatePath("/admin/facilities");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save facility." };
  }
}

export async function deleteFacilityAction(id: string) {
  try {
    await prisma.facility.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/infrastructure");
    revalidatePath("/admin/facilities");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete facility." };
  }
}

// --- News ---
export async function saveNewsAction(data: {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail: string;
  author: string;
  publishDate: Date;
  isPublished: boolean;
  isFeatured: boolean;
}) {
  try {
    if (data.id) {
      await prisma.news.update({ where: { id: data.id }, data });
    } else {
      await prisma.news.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save news." };
  }
}

export async function deleteNewsAction(id: string) {
  try {
    await prisma.news.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/admin/news");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete news." };
  }
}

// --- Events ---
export async function saveEventAction(data: {
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  location: string;
  eventDate: Date;
  time: string;
  regLink?: string;
  status: string;
  isFeatured: boolean;
}) {
  try {
    if (data.id) {
      await prisma.event.update({ where: { id: data.id }, data });
    } else {
      await prisma.event.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save event." };
  }
}

export async function deleteEventAction(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/events");
    revalidatePath("/admin/events");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete event." };
  }
}

// --- Notice Board ---
export async function saveNoticeAction(data: {
  id?: string;
  title: string;
  description?: string;
  fileUrl?: string;
  publishDate: Date;
  expiryDate?: Date;
  isPinned: boolean;
  category: string;
}) {
  try {
    if (data.id) {
      await prisma.notice.update({ where: { id: data.id }, data });
    } else {
      await prisma.notice.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/notice-board");
    revalidatePath("/admin/notices");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save notice." };
  }
}

export async function deleteNoticeAction(id: string) {
  try {
    await prisma.notice.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/notice-board");
    revalidatePath("/admin/notices");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete notice." };
  }
}

// --- Gallery & Categories ---
export async function saveGalleryImageAction(data: {
  id?: string;
  title: string;
  caption?: string;
  imageUrl: string;
  categoryId: string;
  isFeatured: boolean;
}) {
  try {
    if (data.id) {
      await prisma.galleryImage.update({ where: { id: data.id }, data });
    } else {
      await prisma.galleryImage.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save gallery image." };
  }
}

export async function deleteGalleryImageAction(id: string) {
  try {
    await prisma.galleryImage.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete image." };
  }
}

export async function createGalleryCategoryAction(name: string, slug: string) {
  try {
    await prisma.galleryCategory.create({ data: { name, slug } });
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create category." };
  }
}

// --- Achievements ---
export async function saveAchievementAction(data: {
  id?: string;
  title: string;
  subtitle: string;
  description?: string;
  category: string;
  iconColor: string;
  iconName: string;
  year?: string;
  studentName?: string;
  order: number;
}) {
  try {
    if (data.id) {
      await prisma.achievement.update({ where: { id: data.id }, data });
    } else {
      await prisma.achievement.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/achievements");
    revalidatePath("/admin/achievements");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save achievement." };
  }
}

export async function deleteAchievementAction(id: string) {
  try {
    await prisma.achievement.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/achievements");
    revalidatePath("/admin/achievements");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete achievement." };
  }
}

// --- Testimonials ---
export async function saveTestimonialAction(data: {
  id?: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  order: number;
  isActive: boolean;
}) {
  try {
    if (data.id) {
      await prisma.testimonial.update({ where: { id: data.id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save testimonial." };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete testimonial." };
  }
}

// --- Faculty Members ---
export async function saveFacultyMemberAction(data: {
  id?: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  photoUrl: string;
  email?: string;
  order: number;
}) {
  try {
    if (data.id) {
      await prisma.facultyMember.update({ where: { id: data.id }, data });
    } else {
      await prisma.facultyMember.create({ data });
    }
    revalidatePath("/faculty");
    revalidatePath("/admin/faculty");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save faculty member." };
  }
}

export async function deleteFacultyMemberAction(id: string) {
  try {
    await prisma.facultyMember.delete({ where: { id } });
    revalidatePath("/faculty");
    revalidatePath("/admin/faculty");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete faculty member." };
  }
}

// --- Downloads ---
export async function saveDownloadItemAction(data: {
  id?: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
}) {
  try {
    if (data.id) {
      await prisma.downloadItem.update({ where: { id: data.id }, data });
    } else {
      await prisma.downloadItem.create({ data });
    }
    revalidatePath("/downloads");
    revalidatePath("/admin/downloads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save download." };
  }
}

export async function deleteDownloadItemAction(id: string) {
  try {
    await prisma.downloadItem.delete({ where: { id } });
    revalidatePath("/downloads");
    revalidatePath("/admin/downloads");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete download item." };
  }
}

// --- Mandatory Disclosures ---
export async function saveMandatoryDisclosureAction(data: {
  id?: string;
  title: string;
  documentNo?: string;
  fileUrl: string;
  category: string;
}) {
  try {
    if (data.id) {
      await prisma.mandatoryDisclosure.update({ where: { id: data.id }, data });
    } else {
      await prisma.mandatoryDisclosure.create({ data });
    }
    revalidatePath("/mandatory-disclosure");
    revalidatePath("/admin/disclosures");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save disclosure." };
  }
}

export async function deleteMandatoryDisclosureAction(id: string) {
  try {
    await prisma.mandatoryDisclosure.delete({ where: { id } });
    revalidatePath("/mandatory-disclosure");
    revalidatePath("/admin/disclosures");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete disclosure." };
  }
}

// --- Media Library ---
export async function saveMediaFileAction(data: {
  name: string;
  url: string;
  size: number;
  mimeType: string;
  folder: string;
}) {
  try {
    await prisma.mediaFile.create({ data });
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save media." };
  }
}

export async function deleteMediaFileAction(id: string) {
  try {
    await prisma.mediaFile.delete({ where: { id } });
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete media." };
  }
}

// --- Homepage Hero Stats Box Visibility ---
export async function toggleHeroStatsAction(show: boolean) {
  try {
    const { updateSiteSettings } = await import("@/lib/siteSettings");
    const updated = updateSiteSettings({ showHeroStats: show });
    revalidatePath("/");
    revalidatePath("/admin/hero");
    revalidatePath("/admin/settings");
    return { success: true, showHeroStats: updated.showHeroStats };
  } catch (error) {
    return { success: false, error: "Failed to toggle hero stats visibility." };
  }
}

export async function getHeroStatsVisibilityAction() {
  try {
    const { getSiteSettings } = await import("@/lib/siteSettings");
    const settings = getSiteSettings();
    return { success: true, showHeroStats: settings.showHeroStats };
  } catch (error) {
    return { success: true, showHeroStats: true };
  }
}
