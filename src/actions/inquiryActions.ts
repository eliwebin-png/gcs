"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactMessageAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  const subject = (formData.get("subject") as string) || "General Inquiry";

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : "",
        subject: subject.trim(),
        message: message.trim(),
        status: "NEW",
      },
    });

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Thank you! Your message has been received. Our team will contact you shortly." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Could not submit your message. Please try again or call our office directly." };
  }
}

export async function submitAdmissionInquiryAction(formData: FormData) {
  const studentName = formData.get("studentName") as string;
  const parentName = formData.get("parentName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const gradeApplying = formData.get("gradeApplying") as string;
  const prevSchool = (formData.get("prevSchool") as string) || "";
  const message = (formData.get("message") as string) || "";

  if (!studentName || !parentName || !email || !phone || !gradeApplying) {
    return { success: false, error: "Please complete all mandatory admission fields." };
  }

  try {
    await prisma.admissionInquiry.create({
      data: {
        studentName: studentName.trim(),
        parentName: parentName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gradeApplying: gradeApplying.trim(),
        prevSchool: prevSchool.trim(),
        message: message.trim(),
        status: "PENDING",
      },
    });

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Admission application received successfully! Our admissions counselor will connect with you." };
  } catch (error) {
    console.error("Error submitting admission inquiry:", error);
    return { success: false, error: "Could not submit application. Please try again." };
  }
}

export async function updateInquiryStatusAction(id: string, type: "contact" | "admission", status: string, replyText?: string) {
  try {
    if (type === "contact") {
      await prisma.contactMessage.update({
        where: { id },
        data: { status, ...(replyText ? { replyText } : {}) },
      });
    } else {
      await prisma.admissionInquiry.update({
        where: { id },
        data: { status },
      });
    }
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status." };
  }
}

export async function deleteInquiryAction(id: string, type: "contact" | "admission") {
  try {
    if (type === "contact") {
      await prisma.contactMessage.delete({ where: { id } });
    } else {
      await prisma.admissionInquiry.delete({ where: { id } });
    }
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete item." };
  }
}
