"use client";
import { useState, ReactNode, useEffect } from "react";

interface Section {
  label: string;
  content: string;
}

interface OtherLayoutProps {
  children: ReactNode;
  sections: Section[];
  onContentChange: (
    label: string,
    newContent: string,
    newSize?: string
  ) => void;
  onSave: () => void;
  isSaveEnabled: boolean;
  editLabel: string | null;
  onEditClick: (label: string) => void;
  titleSize: string; // Add this line
  buttonSize: string; // Add this line
}

const AccordionSection = ({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) => (
  <div>
    <div
      className={`cursor-pointer hover:bg-neutral-200 px-4 py-3 ${isOpen ? "bg-neutral-100" : ""}`}
      onClick={onToggle}
    >
      {label}
    </div>
    {isOpen && <div className="px-3">{children}</div>}
  </div>
);

export default function OtherLayout({
  children,
  sections,
  onContentChange,
  onSave,
  isSaveEnabled,
  editLabel,
  onEditClick,
  titleSize,
  buttonSize, // Destructure these props
}: OtherLayoutProps) {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (editLabel) {
      const section = sections.find((sec) => sec.label === editLabel);
      if (section) {
        setSelectedContent(section.content);
        setEditContent(section.content);
        setSelectedLabel(editLabel);
      }
    } else {
      setSelectedContent(null);
      setEditContent(null);
      setSelectedLabel(null);
    }
  }, [editLabel, sections]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    setEditContent(newContent);
    setSelectedContent(newContent);
    if (selectedLabel) {
      onContentChange(selectedLabel, newContent);
    }
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    if (selectedLabel) {
      onContentChange(selectedLabel, editContent || "", newSize);
    }
  };
  return (
    <div className="h-full flex flex-1">
      <div className="w-[55px] bg-white h-full border-r"></div>
      <aside className="bg-white text-[#303030] w-1/5">
        <h2 className="border-b px-4 font-semibold py-4">Home page</h2>
        <AccordionSection
          label="Section"
          isOpen={activeIndex === 0}
          onToggle={() => handleAccordionClick(0)}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-neutral-100 px-4 py-1 my-2 rounded-lg bg-white"
              onClick={() => onEditClick(section.label)} // Use onEditClick
            >
              {section.label}
            </div>
          ))}
        </AccordionSection>
      </aside>
      <main className="flex-1 p-2 bg-neutral-200">{children}</main>
      <aside className="bg-white w-1/6">
        <div className="h-content px-4 py-4 border-b">
          {editContent !== null ? (
            <div className="mb-5">
              <h2 className="font-semibold text-[#303030] pb-4 mb-6">
                Heading
              </h2>
              <label className="block p-3 text-[#303030] border bg-neutral-200 rounded-b-none rounded-lg">
                Heading
              </label>
              <input
                type="text"
                value={editContent || ""}
                onChange={handleChange}
                className="w-full p-3 border-l border-r border-b rounded-t-none rounded-lg"
              />
              <label className="block p-3 text-[#303030] border bg-neutral-200 rounded-b-none rounded-lg mt-8">
                Heading size
              </label>
              <select
                value={selectedLabel === "Title" ? titleSize : buttonSize}
                onChange={handleSizeChange}
                className="w-full p-3 hover:bg-neutral-100 border-l border-r border-b rounded-t-none rounded-lg"
              >
                <option value="text-sm">Small</option>
                <option value="text-xl">Medium</option>
                <option value="text-4xl">Large</option>
                <option value="text-6xl">Extra Large</option>
              </select>
            </div>
          ) : (
            <div className="">
              <h2 className="font-semibold text-[#303030]">
                Customize your templates
              </h2>
              <p className="text-sm text-neutral-500 mt-6">
                Select a section or block in the sidebar to start.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
