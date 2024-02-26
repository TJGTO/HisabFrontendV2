"use client";
import CreateNewsAPP from "../../components/createNewsApp";

export default function Page({ params }: { params: { newsId: string } }) {
  return (
    <>
      <CreateNewsAPP newsId={params.newsId} mode={"edit"} />
    </>
  );
}
