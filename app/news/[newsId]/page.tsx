"use client";

import NewsDescription from "../components/newsDescription";
<<<<<<< HEAD
=======
import TextEditor from "../components/testing";
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52

export default function Page({ params }: { params: { newsId: string } }) {
  return (
    <>
      <NewsDescription newsId={params.newsId} />
<<<<<<< HEAD
=======
      <TextEditor />
>>>>>>> 43ee4b9814c1a795ff20a2401508a69b291cce52
    </>
  );
}
