"use client";

import NewsDescription from "../components/newsDescription";
import TextEditor from "../components/testing";

export default function Page({ params }: { params: { newsId: string } }) {
  return (
    <>
      <NewsDescription newsId={params.newsId} />
      <TextEditor />
    </>
  );
}
