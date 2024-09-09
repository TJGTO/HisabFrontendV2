//{ params }: { params: { newsId: string } }
"use client";

import SetPassword from "../components/setpassword";

export default function Page({ params }: { params: { tempId: string } }) {
  return <SetPassword tempId={params.tempId} />;
}
