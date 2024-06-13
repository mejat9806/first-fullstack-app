import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Toolbar from "./Toolbar";
import { Button } from "@/shadcnComponent/ui/button";
import useCreateComment from "@/features/api/Comment/useCreateComment";

const Tiptap = ({
  description,
  onChange,
  withCancel,
  disabled,
}: {
  description: string;
  onChange: (richText: string) => void;
  withCancel: boolean;
  disabled: boolean;
}) => {
  const { isAddComment } = useCreateComment();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-Bullet-style" } },
        orderedList: { HTMLAttributes: { class: "list-order-style" } },
      }),

      Link.configure({
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "link-style",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[100px] max-w-[100%]  text-wrap whitespace-break-spaces ",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });
  const onCancel = () => {
    console.log("Click");
    editor?.commands.clearContent();
  };

  useEffect(() => {
    editor?.commands.clearContent();
  }, [editor, isAddComment]);
  console.log(isAddComment);
  return (
    <div className="">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} disabled={disabled} />
      {withCancel && (
        <div className="w-full flex justify-end gap-3 mt-3">
          <Button type="button" onClick={onCancel} disabled={disabled}>
            Cancel
          </Button>
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Tiptap;
