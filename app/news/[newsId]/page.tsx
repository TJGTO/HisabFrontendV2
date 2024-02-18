"use client";

import NewsDescription from "../components/newsDescription";

export default function Page({ params }: { params: { newsId: string } }) {
  return (
    <>
      <NewsDescription newsId={params.newsId} />
    </>
  );
}
