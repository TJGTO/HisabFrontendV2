//{ params }: { params: { newsId: string } }
"use client";

import SetPassword from "../components/setpassword";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { tempId: string } }) {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log("searchParams", email);
  return <SetPassword tempId={params.tempId} />;
}
