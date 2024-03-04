"use client";

import ProfileSection from "../components/profileSection";

export default function Page({ params }: { params: { userid: string } }) {
  return <ProfileSection userid={params.userid} />;
}
