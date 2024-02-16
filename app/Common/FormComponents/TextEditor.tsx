import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor: React.FC<{
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ content, setContent }) => {
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
