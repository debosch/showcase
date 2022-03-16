import React, { FC } from 'react';
import { EditorWrapper } from './Styles';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

const CustomTextEditor: FC = () => {
  const { quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    placeholder: 'Напишите описание',
  });

  return (
    <EditorWrapper>
      <div ref={quillRef} />
    </EditorWrapper>
  );
};

export default CustomTextEditor;
