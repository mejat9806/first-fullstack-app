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
  // const themeChange = theme === "light" ? "text-white" : "text-black";
  console.log("Current theme:", theme);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: `list-Bullet-style   prose dark:prose-invert   focus:outline-none `,
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: `list-order-style prose  prose dark:prose-invert    focus:outline-none `,
          },
        },
        heading: {
          HTMLAttributes: {
            class: cn(
              `prose  text-3xl  prose dark:prose-invert   focus:outline-none `,
            ),
          },
        },
        bold: {
          HTMLAttributes: {
            class: cn(
              `prose  font-bold   prose dark:prose-invert   focus:outline-none`,
            ),
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
          `rounded-md border min-h-[100px] max-w-[100%]  text-wrap whitespace-break-spaces  prose dark:prose-invert   focus:outline-none
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
