import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (!mounted) {
    return (
      <div 
        ref={editorRef}
        style={{ 
          height: '300px', 
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '12px',
          backgroundColor: '#fff' 
        }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div ref={editorRef}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        style={{ height: '300px', marginBottom: '50px' }}
      />
    </div>
  );
};

export default RichTextEditor;
