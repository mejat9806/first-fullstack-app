import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Toolbar from "./Toolbar";
import { Button } from "@/shadcnComponent/ui/button";
import { useTheme } from "@/components/darkMode/theme-provider";
import { cn } from "@/lib/utils";

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
  const { theme } = useTheme();
  const themeChange = theme === "dark" ? "text-white" : "text-black";
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: `list-Bullet-style prose ${themeChange}` },
        },
        orderedList: {
          HTMLAttributes: { class: `list-order-style prose ${themeChange}` },
        },
        heading: {
          HTMLAttributes: {
            class: cn(`prose ${themeChange} text-3xl`),
          },
        },
        bold: {
          HTMLAttributes: {
            class: cn(`prose ${themeChange} font-bold `),
          },
        },
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
        class: cn(
          `rounded-md border min-h-[100px] max-w-[100%]  text-wrap whitespace-break-spaces prose ${
            theme === "dark" ? "text-white" : "text-black"
          }`,
        ),
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
  }, [editor, disabled]);
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
