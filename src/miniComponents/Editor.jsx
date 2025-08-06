// src/components/BlogEditor.jsx
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function Editor({ onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your blog...</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) onChange(html)
    },
  })

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#1E1E1E]">
      <EditorContent editor={editor} className="prose dark:prose-invert max-w-none min-h-[300px]" />
    </div>
  )
}

export default Editor
