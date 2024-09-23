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
          onEditImageClick?.(label);
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
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;

        // Update the corresponding image state and localStorage
        if (column === "image1") {
          localStorage.setItem("uploadedLogoImage", base64Image);
          useImageStore.getState().setLogoImage(base64Image);
        } else if (column === "image2") {
          localStorage.setItem("uploadedSecondaryImage", base64Image);
          useImageStore.getState().setSecondaryImage(base64Image);
        }

        setSuccessMessage("Image uploaded successfully!");

        // Clear the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      };

      reader.readAsDataURL(file); // Read file as base64
    } else {
      setSuccessMessage("No file selected.");

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
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
        <CustomSidebar
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
          editContent={editContent}
          handleChange={handleChange}
          editImage={editImage}
          handleImageUpload={handleImageUpload}
          selectedLabel={selectedLabel || ""}
          titleSize={titleSize}
          buttonSize={buttonSize}
          navLinkSize1={navLinkSize1}
          navLinkSize2={navLinkSize2}
          handleSizeChange={handleSizeChange}
          opacity={opacity}
          handleChangerange={handleChangerange}
          height={height}
          handleHeightChange={handleHeightChange}
          position={position}
          handlePositionChange={handlePositionChange}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
          textAlign={textAlign}
          handleButtonClick={handleButtonClick}
        />
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
