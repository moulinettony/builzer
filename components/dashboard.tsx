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
  onEditImageClick,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onEditImageClick?: (label: string) => void;
  children: ReactNode;
}) => (
  <div>
    <div
      className={`cursor-pointer hover:bg-neutral-200 text-[14px] px-2 gap-2 flex rounded-lg py-1 ${
        isOpen ? "bg-neutral-100" : ""
      }`}
      onClick={() => {
        onToggle();
        onEditImageClick?.(label); // Optional chaining to call if provided
      }}
    >
      {label === "Image banner" && (
        <img className="" src="img.svg" alt="imglogo" />
      )}
      {label === "Header" && (
        <img className="" src="header.svg" alt="imglogo" />
      )}
      {label}
    </div>
    {isOpen && <div className="pl-5">{children}</div>}
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
  const [value, setValue] = useState(40);

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

  const handleChangerange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="h-full flex flex-1">
      <div className="w-[55px] bg-white h-full border-r"></div>
      <aside className="bg-white text-[#303030] w-[300px]">
        <h2 className="border-b px-4 font-semibold py-4">Home page</h2>
        <div className="px-4">
          <h3 className="font-semibold text-[14px] py-4">Header</h3>
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
                className="cursor-pointer hover:bg-neutral-100 text-[14px] py-1 mt-2 px-4 rounded-lg bg-white"
                onClick={() => onEditClick(section.label)}
              >
                {section.label}
              </div>
            ))}
          </AccordionSection>
        </div>
        <h3 className="border-t mt-3 px-4 font-semibold text-[14px] py-4">
          Section
        </h3>
        <div className="px-4">
          <AccordionSection
            label="Image banner"
            isOpen={activeIndex === 0}
            onToggle={() => setActiveIndex(activeIndex === 0 ? null : 0)}
            onEditImageClick={onEditImageClick} // Pass this prop here
          >
            {sections.map((section, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-neutral-100 text-[14px] px-4 py-1 mt-2 rounded-lg bg-white"
                onClick={() => onEditClick(section.label)}
              >
                {section.label}
              </div>
            ))}
          </AccordionSection>
        </div>
      </aside>
      <main className="flex-1 p-2 bg-neutral-200">{children}</main>
      <aside
        className={`bg-white w-[350px] ${
          isSidebarVisible ? "block" : "hidden"
        } xl:block max-xl:absolute max-xl:left-[55px] max-lg:w-1/5`}
      >
        <div className="h-content px-4 py-4 border-b">
          {editContent !== null && !editImage ? (
            <div className="mb-5">
              <h2 className="font-semibold text-[14px] text-[#303030] pb-4 mb-6">
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
              <h2 className="font-semibold text-[14px] text-neutral-600 pb-4 mb-6">
                Image banner
              </h2>
              <div className="flex w-full justify-between">
                <p className="text-sm text-[#303030]">First image</p>
                <img src="data.svg" alt="dataimg" />
              </div>
              <div className="relative border-2 mt-2 border-gray-300 border-dashed rounded-lg p-6">
                <input
                  type="file"
                  className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="text-center">
                  <h3 className="my-2 text-[13px] font-medium text-gray-900">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-gray-200 text-blue-600 py-1 px-2 rounded"
                    >
                      Select image
                      <input
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-blue-600 mt-4">
                    Explore free images
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex w-full justify-between">
                  <p className="text-sm text-[#303030]">Second image</p>
                  <img src="data.svg" alt="dataimg" />
                </div>
                <div className="relative border-2 mt-2 border-gray-300 border-dashed rounded-lg p-6">
                  <input
                    type="file"
                    className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="text-center">
                    <h3 className="my-2 text-[13px] font-medium text-gray-900">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-gray-200 text-blue-600 py-1 px-2 rounded"
                      >
                        Select image
                        <input
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-blue-600 mt-4">
                      Explore free images
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm text-[#303030] mb-2">
                  Image overlay opacity
                </p>
                <input
                  id="range1"
                  type="range"
                  min="0"
                  max="100"
                  className="mt-2"
                  value={value}
                  onChange={handleChangerange}
                />
                <span className="ml-2 text-sm text-[#303030]">{value}%</span>
              </div>
              <div className="mt-5 mb-2">
                <p className="text-sm text-neutral-700 mb-2">Banner height</p>
                <select className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg">
                  <option value="">Small</option>
                  <option value="">Medium</option>
                  <option value="" selected>
                    Large
                  </option>
                </select>
                <p className="text-[13px] mt-2 leading-tight text-neutral-500 mb-2">
                  For best results, use an image with a 3:2 aspect ratio.
                </p>
              </div>
              <div className="mt-5 mb-2">
                <p className="text-sm text-neutral-700 mb-2">Desktop content position</p>
                <select className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg">
                  <option value="">Top left</option>
                  <option value="">Top center</option>
                  <option value="">Top right</option>
                  <option value="">Middle left</option>
                  <option value="">Middle center</option>
                  <option value="">Middle right</option>
                  <option value="">Bottom left</option>
                  <option value="">Bottom center</option>
                  <option value="">Bottom right</option>
                  <option value="" selected>
                    Large
                  </option>
                </select>
              </div>
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
