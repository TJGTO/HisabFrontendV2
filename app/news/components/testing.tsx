import React, { useRef, useEffect, useState } from "react";
import JoditEditor from "jodit-react";

const TextEditor: React.FC = () => {
  const editor = useRef<any>(null);
  const [content, setContent] = useState<string>("");
  const [outputContent, setoutputContent] = useState<string>("");

  const handleContentChange = (newContent: string) => {
    // Update local state
    setContent(newContent);
    // Callback to parent component with the updated content
  };

  const handleSubmit = () => {
    // Call onSubmit with the current content
    console.log(content);
    setoutputContent(content);
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          readonly: false,
          // Set dark mode specific configurations here
          theme: "dark",
        }}
        onBlur={(newContent: string) => handleContentChange(newContent)}
      />
      {/* <button onClick={handleSubmit}>Submit</button> */}
      {/* <div>
        <h2>Output:</h2>
        <div dangerouslySetInnerHTML={{ __html: outputContent }} />{" "}
        
      </div> */}
    </div>
  );
};

export default TextEditor;
