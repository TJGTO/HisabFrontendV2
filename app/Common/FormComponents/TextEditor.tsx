"use client";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({
  content,
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useRef<any>(null);
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          readonly: false,
          theme: "dark",
        }}
        onBlur={(newContent: string) => handleContentChange(newContent)}
      />
    </div>
  );
};

export default TextEditor;
