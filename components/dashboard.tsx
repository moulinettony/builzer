// components/dashboard.tsx
import { useState, useEffect, ReactNode } from "react";

interface Section {
  label: string;
  content: string;
}

interface OtherLayoutProps {
  children: ReactNode;
  sections: Section[];
  headerSections: Section[];
  onContentChange: (
    label: string,
    newContent: string,
    newSize?: string
  ) => void;
  onSave: () => void;
  isSaveEnabled: boolean;
  editLabel: string | null;
  onEditClick: (label: string) => void;
  titleSize: string;
  buttonSize: string;
  navLinkSize1: string;
  navLinkSize2: string;
  editImageLabel: string | null;
  onEditImageClick: (label: string) => void;
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
      className={`cursor-pointer hover:bg-neutral-200 px-4 py-3 ${
        isOpen ? "bg-neutral-100" : ""
      }`}
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
  headerSections,
  onContentChange,
  editLabel,
  onEditClick,
  titleSize,
  buttonSize,
  navLinkSize1,
  navLinkSize2,
  editImageLabel,
  onEditImageClick,
}: OtherLayoutProps) {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeHeaderIndex, setActiveHeaderIndex] = useState<number | null>(
    null
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isImageSidebarVisible, setIsImageSidebarVisible] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [logoImage, setLogoImage] = useState<string>("/wow.svg");

  useEffect(() => {
    if (editLabel) {
      const section = [...sections, ...headerSections].find(
        (sec) => sec.label === editLabel
      );
      if (section) {
        setSelectedContent(section.content);
        setEditContent(section.content);
        setSelectedLabel(editLabel);
        setIsSidebarVisible(true);
        setIsImageSidebarVisible(false);
        setEditImage(false);
      }
    } else if (editImageLabel) {
      setEditImage(true);
      setSelectedLabel(editImageLabel);
      setIsSidebarVisible(false);
      setIsImageSidebarVisible(true);
      setEditContent(null);
    } else {
      setSelectedContent(null);
      setEditContent(null);
      setSelectedLabel(null);
      setIsSidebarVisible(false);
      setIsImageSidebarVisible(false);
      setEditImage(false);
    }
  }, [editLabel, editImageLabel, sections, headerSections]);

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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          let newImageUrl = data.imageUrl;
          console.log('zzzz',data.imageUrl)

          // Force reload the image by appending a timestamp query parameter
          newImageUrl += `?t=${new Date().getTime()}`;

          // Update the state with the new image URL
          setLogoImage(newImageUrl);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="h-full flex flex-1">
      <div className="w-[55px] bg-white h-full border-r"></div>
      <aside className="bg-white text-[#303030] w-[250px]">
        <h2 className="border-b px-4 font-semibold py-4">Home page</h2>
        <AccordionSection
          label="Header"
          isOpen={activeHeaderIndex === 0}
          onToggle={() =>
            setActiveHeaderIndex(activeHeaderIndex === 0 ? null : 0)
          }
        >
          {headerSections.map((section, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-neutral-100 px-4 py-1 my-2 rounded-lg bg-white"
              onClick={() => onEditClick(section.label)}
            >
              {section.label}
            </div>
          ))}
        </AccordionSection>
        <AccordionSection
          label="Section"
          isOpen={activeIndex === 0}
          onToggle={() => setActiveIndex(activeIndex === 0 ? null : 0)}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-neutral-100 px-4 py-1 my-2 rounded-lg bg-white"
              onClick={() => {
                if (section.label === "Image") {
                  onEditImageClick(section.label); // Call handleImageClick if the section is "Image"
                } else {
                  onEditClick(section.label);
                }
              }}
            >
              {section.label}
            </div>
          ))}
        </AccordionSection>
      </aside>
      <main className="flex-1 p-2 bg-neutral-200">{children}</main>
      <aside
        className={`bg-white w-[250px] ${
          isSidebarVisible ? "block" : "hidden"
        } xl:block max-xl:absolute max-xl:left-[55px] max-lg:w-1/5`}
      >
        <div className="h-content px-4 py-4 border-b">
          {editContent !== null && !editImage ? (
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
                value={
                  selectedLabel === "Title"
                    ? titleSize
                    : selectedLabel === "Button"
                    ? buttonSize
                    : selectedLabel === "NavLink1"
                    ? navLinkSize1
                    : selectedLabel === "NavLink2"
                    ? navLinkSize2
                    : ""
                }
                onChange={handleSizeChange}
                className="w-full p-3 hover:bg-neutral-100 border-l border-r border-b rounded-t-none rounded-lg"
              >
                <option value="text-sm">Small</option>
                <option value="text-xl">Medium</option>
                <option value="text-4xl">Large</option>
                <option value="text-6xl">Extra Large</option>
              </select>
            </div>
          ) : editImage ? (
            <div className="mb-5">
              <h2 className="font-semibold text-[#303030] pb-4 mb-6">
                Edit Image
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-dashed rounded-lg"
              />
            </div>
          ) : (
            <div>
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
