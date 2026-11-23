import React from "react";
import prisma from "@/lib/prisma";
import InquiriesClient from "./InquiriesClient";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const [admissions, contacts] = await Promise.all([
    prisma.admissionInquiry.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  return <InquiriesClient admissions={admissions} contacts={contacts} />;
}
