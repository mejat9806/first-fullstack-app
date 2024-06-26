import { useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Link as LinkIcon,
} from "lucide-react";
import { Toggle } from "@/shadcnComponent/ui/toggle";
import DialogFN from "./DialogFN";
import AddUrl from "./AddUrl";
import { FaLinkSlash } from "react-icons/fa6";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  const [OpenLink, setOpenLink] = useState<boolean>(false);
  if (!editor) {
    return null;
  }
  const addLink = (url: string) => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={20} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={20} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={20} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={20} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={20} />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={20} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("link")}
        onClick={(e) => {
          e.stopPropagation(), setOpenLink(true);
        }}
        className="ml-2"
      >
        <LinkIcon size={20} />
      </Toggle>
      <DialogFN
        open={OpenLink}
        type="component"
        setIsOpen={setOpenLink}
        component={<AddUrl setIsOpen={setOpenLink} addLink={addLink} />}
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={() => editor.chain().focus().unsetLink().run()}
      >
        <FaLinkSlash size={20} />{" "}
      </Toggle>
    </div>
  );
};

export default Toolbar;
