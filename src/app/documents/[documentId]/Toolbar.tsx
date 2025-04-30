'use client'

import { cn } from "@/lib/utils";
import { EditorStore } from "@/store/EditorStore";
import {
    BoldIcon,
    ItalicIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquarePlus,
    PrinterIcon,
    Redo2Icon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolBarButton = ({ onClick,
    isActive,
    icon: Icon }: ToolBarButtonProps) => {
    return (
        <button onClick={onClick} className={cn(
            "text-small h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-300/80",
            isActive && "bg-neutral-300/80"
        )} >
            <Icon className="size-4" />
        </button>
    )
}


export const Toolbar = () => {

    const { editor } = EditorStore();
    // console.log("Toolbar edtior", { editor })
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }

                },
            ],
            [
                {
                    label: "Bold",
                    isActive: editor?.isActive("bold"),
                    icon: BoldIcon,
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    isActive: editor?.isActive("italic"),
                    icon: ItalicIcon,
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                }, {
                    label: "Underline",
                    isActive: editor?.isActive("underline"),
                    icon: UnderlineIcon,
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                }
            ], [
                {
                    label: "Comment",
                    icon: MessageSquarePlus,
                    onClick: () => console.log("need to add comment function"),
                    isActive: false,
                }, {
                    label: "List Todo",
                    isActive: editor?.isActive("taskList"),
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),

                },

            ]
        ];
    return (
        <div className="bg-[#e9e9e9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-0.5 overflow-x-auto " >
            {sections[0].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* Todo: font family */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* todo : heading */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* todo : font size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* todo: text color
            todo: highlight color */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* todo: link
            todo: image
            todo: align
            todo: line height
            todo: list */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[2].map((item) => (
                <ToolBarButton key={item.label} {...item} />
            ))}
        </div>
    )
}