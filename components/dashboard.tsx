// components/dashboard.tsx
import { useState, useEffect, ReactNode } from "react";
import CustomSidebar from "./CustomSidebar";
import ThemeSettingsSidebar from "./ThemeSettingsSidebar";
import Embeds from "./embeds";
import { useImageStore } from "./useImageStore";

interface Section {
  label: string;
  content: string;
}
interface OtherLayoutProps {
  isChecked: boolean; // Add isChecked prop
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  textAlign: string; // Add textAlign prop
  setTextAlign: React.Dispatch<React.SetStateAction<string>>;
  position: string; // Add position prop
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  height: "small" | "medium" | "large";
  setHeight: React.Dispatch<React.SetStateAction<"small" | "medium" | "large">>;
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
  opacity: number;
  setOpacity: (value: number) => void;
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
}) => {
  return (
    <div>
      <div
        className={`cursor-pointer hover:bg-neutral-200 text-[14px] px-2 gap-2 flex items-center rounded-lg py-1 ${
          isOpen ? "bg-neutral-100" : ""
        }`}
        onClick={() => {
          onToggle();
          onEditImageClick?.(label); // Optional chaining to call if provided
        }}
      >
        <span
          className={`transform text-lg text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ›
        </span>
        {label === "Image banner" && (
          <img className="" src="img.svg" alt="imglogo" />
        )}
        {label === "Header" && (
          <img className="" src="header.svg" alt="imglogo" />
        )}
        {label === "Footer" && (
          <img className="rotate-[180deg]" src="header.svg" alt="imglogo" />
        )}
        <p>{label}</p>
      </div>
      {isOpen && <div className="pl-5">{children}</div>}
    </div>
  );
};

export default function OtherLayout({
  isChecked,
  setIsChecked,
  height,
  setHeight,
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
  opacity,
  setOpacity,
  position,
  setPosition,
  textAlign, // Add textAlign prop
  setTextAlign, // Add setTextAlign setter prop
}: OtherLayoutProps) {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeHeaderIndex, setActiveHeaderIndex] = useState<number | null>(
    null
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isImageSidebarVisible, setIsImageSidebarVisible] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [selectedButtontab, setSelectedButtontab] = useState<number>(1);
  const [secondAccordionIndex, setSecondAccordionIndex] = useState<
    number | null
  >(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTabClick = (index: number) => {
    setSelectedButtontab(index);
  };

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
      setIsSidebarVisible(true);
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
    event: React.ChangeEvent<HTMLInputElement>,
    column: string // Pass the column name (image1 or image2)
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("column", column); // Specify which column to update

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

          // Update the corresponding image state
          if (column === "image1") {
            useImageStore.getState().setLogoImage(newImageUrl); // Use Zustand to update logoImage
          } else if (column === "image2") {
            useImageStore.getState().setSecondaryImage(newImageUrl); // Use Zustand to update secondaryImage
          }

          setSuccessMessage(data.message);

          // Clear the success message after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null); // Clear the message after a delay
          }, 2000); // 5000ms = 5 seconds
        } else {
          console.error("Image upload failed");
          setSuccessMessage("Image upload failed");

          // Clear the error message after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null); // Clear the message after a delay
          }, 2000);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setSuccessMessage("Error uploading image");

        // Clear the error message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null); // Clear the message after a delay
        }, 2000);
      }
    }
  };

  const handleChangerange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setOpacity(value); // Update the opacity state in page.tsx
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHeight(event.target.value as "small" | "medium" | "large");
  };

  const handleButtonClick = (index: number) => {
    const alignments = ["text-left", "text-center", "text-right"];
    setTextAlign(alignments[index]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked); // Update the checkbox state
  };

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPosition(event.target.value); // Update position based on selected value
  };

  return (
    <div className="h-full flex flex-1">
      {successMessage && (
        <div className="fixed z-[9] translate-x-[-50%] top-5 left-[50%] bg-green-500 text-white py-2 px-6 rounded transition-opacity duration-500 ease-in-out">
          {successMessage}
        </div>
      )}
      <div className="w-[55px] bg-white h-full border-r">
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleTabClick(1)}
            className={`p-3 mt-3 rounded-lg grayscale ${
              selectedButtontab === 1 ? "bg-gray-100 grayscale-0" : ""
            }`}
          >
            <img src="/section.svg" alt="" />
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`p-3 my-3 rounded-lg grayscale ${
              selectedButtontab === 2 ? "bg-gray-100 grayscale-0" : ""
            }`}
          >
            <img src="/settings.svg" alt="" />
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`p-3 rounded-lg grayscale ${
              selectedButtontab === 3 ? "bg-gray-100 grayscale-0" : ""
            }`}
          >
            <img src="/apps.svg" alt="" />
          </button>
        </div>
      </div>
      {selectedButtontab === 1 && (
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
                  className="cursor-pointer hover:bg-neutral-100 text-[14px] flex items-center py-1 mt-2 px-4 rounded-lg bg-white"
                  onClick={() => onEditClick(section.label)}
                >
                  {(section.label === "Home" ||
                    section.label === "Default") && (
                    <img
                      src="text.svg"
                      alt="Text icon"
                      className="mr-2 inline"
                    />
                  )}
                  {section.label}
                </div>
              ))}
            </AccordionSection>
            <div className="flex items-center px-6 gap-2 hover:bg-neutral-100 py-1 rounded-lg cursor-pointer">
              <img src="add.svg" alt="svgimgs" />
              <p className="text-[14px] text-blue-600">Add Section</p>
            </div>
          </div>
          <h3 className="border-t mt-3 px-4 font-semibold text-[14px] py-4">
            Section
          </h3>
          <div className="px-4">
            <AccordionSection
              label="Image banner"
              isOpen={activeIndex === 0} // This determines if the accordion is open
              onToggle={() => {
                if (activeIndex === 0) {
                  setActiveIndex(null); // Close the accordion
                  setIsSidebarVisible(false); // Hide the sidebar
                } else {
                  setActiveIndex(0); // Open the accordion
                  setIsSidebarVisible(true); // Show the sidebar
                }
              }} // Toggle between open and close
              onEditImageClick={onEditImageClick} // Pass this prop here
            >
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-neutral-100 text-[14px] flex items-center px-4 py-1 mt-2 rounded-lg bg-white"
                  onClick={() => {
                    // Ensure the sidebar opens when this div is clicked
                    setIsSidebarVisible(true);
                    onEditClick(section.label); // Trigger any other functionality you need
                  }}
                >
                  {section.label === "Title" && (
                    <img
                      src="text.svg"
                      alt="Text icon"
                      className="mr-2 inline"
                    />
                  )}
                  {section.label === "Button" && (
                    <img
                      src="btn.svg"
                      alt="Text icon"
                      className="mr-2 inline"
                    />
                  )}
                  {section.label}
                </div>
              ))}
            </AccordionSection>
            <div className="flex items-center px-6 gap-2 hover:bg-neutral-100 py-1 rounded-lg cursor-pointer">
              <img src="add.svg" alt="svgimgs" />
              <p className="text-[14px] text-blue-600">Add Section</p>
            </div>
          </div>
          <h3 className="border-t mt-3 px-4 font-semibold text-[14px] py-4">
            Footer
          </h3>
          <div className="px-4">
            <AccordionSection
              label="Footer"
              isOpen={secondAccordionIndex === 1}
              onToggle={() =>
                setSecondAccordionIndex(secondAccordionIndex === 1 ? null : 1)
              }
            >
              <div className="flex items-center px-6 gap-2 hover:bg-neutral-100 py-1 rounded-lg cursor-pointer">
                <img src="/add.svg" alt="svgimgs" />
                <p className="text-[14px] text-blue-600">Add Section</p>
              </div>
            </AccordionSection>
          </div>
        </aside>
      )}
      {selectedButtontab === 2 && <ThemeSettingsSidebar />}
      {selectedButtontab === 3 && <Embeds />}
      <main
        className="flex-1 p-2 bg-neutral-200 overflow-y-scroll"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {children}
      </main>
      {selectedButtontab === 1 && (
        <aside
          className={`bg-white w-[300px] overflow-y-scroll ${
            isSidebarVisible ? "block" : "hidden"
          } xl:block max-xl:absolute max-xl:left-[55px] max-lg:w-1/5`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <button
            onClick={() => setIsSidebarVisible(false)}
            className="absolute top-[14px] leading-[0] h-[15px] rotate-[180deg] pb-[6px] pt-[3px] px-[7px] rounded-lg h-[26px] left-5 text-gray-500 text-lg hover:bg-gray-100"
          >
            ›
          </button>
          <div className="py-4">
            {editContent !== null && !editImage ? (
              <div className="mb-5 px-5">
                <h2 className="font-semibold max-xl:ml-8 text-[14px] text-[#303030] pb-4 mb-6">
                  Heading
                </h2>
                <p className="text-[#303030] mb-2 text-sm">Heading</p>
                <div className="flex gap-3 p-3 border-neutral-500 border bg-neutral-100 rounded-b-none rounded-lg">
                  <img
                    className="cursor-pointer"
                    src="/textedit.svg"
                    alt="logo"
                  />
                  <img
                    className="cursor-pointer"
                    src="/textedit1.svg"
                    alt="logo"
                  />
                  <img
                    className="cursor-pointer"
                    src="/textedit2.svg"
                    alt="logo"
                  />
                  <img
                    className="cursor-pointer"
                    src="/textedit3.svg"
                    alt="logo"
                  />
                </div>
                <input
                  type="text"
                  value={editContent || ""}
                  onChange={handleChange}
                  className="w-full p-3 border-l border-r border-neutral-500 border-b rounded-t-none rounded-lg"
                />
                <p className="text-[#303030] mb-2 text-sm mt-8">Heading Size</p>
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
                  className="w-full py-1 px-2 hover:bg-neutral-100 border-neutral-500 border rounded-lg"
                >
                  <option value="text-sm">Small</option>
                  <option value="text-xl">Medium</option>
                  <option value="text-4xl">Large</option>
                  <option value="text-6xl">Extra Large</option>
                </select>
              </div>
            ) : editImage ? (
              <div className="mb-5 px-5">
                <h2 className="font-semibold text-[14px] max-xl:ml-8 text-neutral-600 pb-4 mb-6">
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
                    onChange={(e) => handleImageUpload(e, "image1")}
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
                      onChange={(e) => handleImageUpload(e, "image2")}
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
                <div className="mt-5 w-full">
                  <p className="text-sm text-[#303030] mb-2">
                    Image overlay opacity
                  </p>
                  <div className="flex justify-between">
                    <input
                      id="range1"
                      type="range"
                      min="0"
                      max="1.0"
                      step="0.01"
                      className="mt-2 w-[75%]"
                      value={opacity}
                      onChange={handleChangerange}
                    />
                    <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                      {Math.round(opacity * 100)} %
                    </span>
                  </div>
                </div>
                <div className="mt-5 mb-2">
                  <p className="text-sm text-neutral-700 mb-2">Banner height</p>
                  <select
                    value={height}
                    onChange={handleHeightChange}
                    className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large" selected>
                      Large
                    </option>
                  </select>
                  <p className="text-[13px] mt-2 leading-tight text-neutral-500 mb-2">
                    For best results, use an image with a 3:2 aspect ratio.
                  </p>
                </div>
                <div className="mt-5 mb-2">
                  <p className="text-sm text-neutral-700 mb-2">
                    Desktop content position
                  </p>
                  <select
                    value={position}
                    onChange={handlePositionChange}
                    className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg"
                  >
                    <option value="items-start justify-start">Top left</option>
                    <option value="items-center justify-start">
                      Top center
                    </option>
                    <option value="items-end justify-start">Top right</option>
                    <option value="items-start justify-center">
                      Middle left
                    </option>
                    <option value="items-center justify-center">
                      Middle center
                    </option>
                    <option value="items-end justify-center">
                      Middle right
                    </option>
                    <option value="items-start justify-end">Bottom left</option>
                    <option value="items-center justify-end">
                      Bottom center
                    </option>
                    <option value="items-end justify-end">Bottom right</option>
                  </select>
                </div>
                <div className="mt-5 mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p className="text-sm text-neutral-600">
                      Show container on desktop
                    </p>
                  </label>
                </div>
                <div className="mt-5 mb-2">
                  <p className="text-sm text-neutral-600 mb-2">
                    Desktop content alignment
                  </p>
                  <div className="bg-neutral-100 p-1 rounded-lg">
                    {["Left", "Center", "Right"].map((label, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(index)} // Call handleButtonClick with the index
                        className={`py-1 px-2 rounded w-[33.33%] text-sm text-neutral-600 ${
                          textAlign === `text-${label.toLowerCase()}`
                            ? "bg-white"
                            : "bg-neutral-100"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5 mb-2">
                  <h3 className="font-semibold text-[14px] text-neutral-700 my-6">
                    Animations
                  </h3>
                  <p className="text-sm text-neutral-700 mb-2">
                    Image behavior
                  </p>
                  <select className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg">
                    <option value="" selected>
                      None
                    </option>
                    <option value="">Ambient movement</option>
                    <option value="">Fixed background position</option>
                    <option value="">Zoom in on scroll</option>
                  </select>
                </div>
                <div className="mt-5 mb-2">
                  <label className="flex items-center gap-2 mb-4">
                    <input type="checkbox" />
                    <p className="text-sm text-neutral-600">
                      Stack images on mobile
                    </p>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <p className="text-sm text-neutral-600">
                      Show container on mobile
                    </p>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b">
                  <div className="px-4 pb-4">
                    <img
                      className="w-[24px] opacity-80 mb-6"
                      src="/sectionblack.svg"
                      alt=""
                    />
                    <h2 className="font-semibold text-sm text-[#303030]">
                      Customize your templates
                    </h2>
                    <p className="text-xs max-w-[180px] text-neutral-500 mt-2">
                      Select a section or block in the sidebar to start.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="px-2 pb-4">
                    <h2 className="px-2 font-semibold text-sm text-[#303030]">
                      Keyboard shortcuts
                    </h2>
                    <div className="flex bg-neutral-50 rounded-lg my-2 justify-between items-center py-1 px-2">
                      <p className="text-sm text-[#303030]">Undo</p>
                      <div className="flex gap-1">
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm font-light rounded">
                          ⌘
                        </p>
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm rounded">
                          Z
                        </p>
                      </div>
                    </div>
                    <div className="flex rounded-lg my-2 justify-between items-center py-1 px-2">
                      <p className="text-sm text-[#303030]">Redo</p>
                      <div className="flex gap-1">
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm font-light rounded">
                          ⌘
                        </p>
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm rounded">
                          Y
                        </p>
                      </div>
                    </div>
                    <div className="flex bg-neutral-50 rounded-lg my-2 justify-between items-center py-1 px-2">
                      <p className="text-sm text-[#303030]">Save</p>
                      <div className="flex gap-1">
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm font-light rounded">
                          ⌘
                        </p>
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm rounded">
                          S
                        </p>
                      </div>
                    </div>
                    <div className="flex rounded-lg my-2 justify-between items-center py-1 px-2">
                      <p className="text-sm text-[#303030]">
                        Preview inspector
                      </p>
                      <div className="flex gap-1">
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm font-light rounded">
                          ⌘
                        </p>
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm rounded">
                          |
                        </p>
                      </div>
                    </div>
                    <div className="flex bg-neutral-50 rounded-lg my-2 justify-between items-center py-1 px-2">
                      <p className="text-sm text-[#303030]">
                        See all shortcuts
                      </p>
                      <div className="flex gap-1">
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm font-light rounded">
                          ⌘
                        </p>
                        <p className="bg-neutral-100 h-7 w-7 flex items-center justify-center text-xm rounded">
                          /
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
      {selectedButtontab === 2 && (
        <aside
          className={`bg-white w-[300px] max-xl:hidden overflow-y-scroll ${
            isSidebarVisible ? "block" : "hidden"
          } xl:block max-xl:absolute max-xl:left-[55px] max-lg:w-1/5`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="p-5">
            <img className="w-[40px] opacity-80 mb-3" src="/paint.svg" alt="" />
            <h2 className="font-semibold text-sm text-[#303030]">
              Customize the appearance of your entire online store
            </h2>
            <p className="text-xs max-w-[200px] text-neutral-500 my-2">
              Theme settings control the colors, typography and other common
              elements of your online store. <br />
              <br />
              Depending on the theme, this can include settings for buttons,
              social media links, checkout, and more.
              <br />
              <br />
              When you edit theme settings, the changes apply to your entire
              online store.
            </p>
            <a
              className="text-blue-500 text-sm underline"
              href="https://dopweb.com/"
              target="_blank"
            >
              Learn more about theme settings
            </a>
          </div>
        </aside>
      )}
      {selectedButtontab === 3 && (
        <aside
          className={`bg-white w-[300px] max-xl:hidden overflow-y-scroll ${
            isSidebarVisible ? "block" : "hidden"
          } xl:block max-xl:absolute max-xl:left-[55px] max-lg:w-1/5`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="p-5 border-b">
            <img className="w-[40px] opacity-80 mb-3" src="/apps2.svg" alt="" />
            <h2 className="font-semibold text-sm text-[#303030]">
              Extend the functionality of your online store with apps
            </h2>
            <p className="text-xs max-w-[200px] text-neutral-500 my-2">
              With Online Store 2.0 themes, apps can be added to your online
              store in different ways: as a block in a template or embedded
              throughout your entire online store. <br />
              <br />
              With themes that aren’t compatible with Online Store 2.0, apps
              might integrate by adding custom code directly to your theme.
              <br />
              <br />
              You can manage apps embedded throughout your online store here,
              including apps added with custom code. To manage app blocks, go to
              the template the app was built for.
            </p>
            <a
              className="text-blue-500 text-sm underline"
              href="https://dopweb.com/"
              target="_blank"
            >
              Learn more about apps
            </a>
          </div>
          <div className="p-5">
            <h2 className="font-semibold text-sm text-[#303030]">
              Find apps for your store
            </h2>
            <p className="text-xs max-w-[200px] text-neutral-500 my-2">
              Browse apps built to integrate seamlessly with Online Store 2.0
              themes through blocks or embeds.
            </p>
            <a
              className="text-blue-500 text-sm underline"
              href="https://dopweb.com/"
              target="_blank"
            >
              Go to Shopify App Store
            </a>
          </div>
        </aside>
      )}
    </div>
  );
}
