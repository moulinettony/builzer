// app/landing-page/page.tsx
"use client";
import { useEffect, useState } from "react";
import OtherLayout from "../../components/dashboard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useImageStore } from "../../components/useImageStore";
import "./../globals.css";

export default function HomePage() {
  const [title, setTitle] = useState<string>("Browse our latest products");
  const [sublink, setLink] = useState<string>("Shop all");
  const [initialTitle, setInitialTitle] = useState<string>("");
  const [initialSublink, setInitialSublink] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState<string>("text-6xl");
  const [buttonSize, setButtonSize] = useState<string>("text-xl");
  const [loading, setLoading] = useState<boolean>(false);
  const [navLink1, setNavLink1] = useState<string>("Home");
  const [navLink2, setNavLink2] = useState<string>("Default");
  const [navLinkUrl1, setNavLinkUrl1] = useState<string>("");
  const [navLinkUrl2, setNavLinkUrl2] = useState<string>("");
  const [navLinkSize1, setNavLinkSize1] = useState<string>("text-sm");
  const [navLinkSize2, setNavLinkSize2] = useState<string>("text-sm");
  const logoImage = useImageStore((state) => state.logoImage);
  const [editImageLabel, setEditImageLabel] = useState<string | null>(null);
  const secondaryImage = useImageStore((state) => state.secondaryImage);
  const [opacity, setOpacity] = useState<number>(0.4);
  const [height, setHeight] = useState<"small" | "medium" | "large">("medium");
  const [position, setPosition] = useState<string>(
    "items-center justify-center"
  );
  const [textAlign, setTextAlign] = useState<string>("text-center");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const handleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleFooterVisibility = () => {
    setIsFooterVisible(!isFooterVisible);
  };

  const handleVisibility = () => {
    setIsTitleVisible(!isTitleVisible);
  };

  const handleBtnVisibility = () => {
    setIsBtnVisible(!isBtnVisible);
  };

  const sizeToHeight = {
    small: "h-[40vh]",
    medium: "h-[60vh]",
    large: "h-[80vh]",
  };

  /*
    useEffect(() => {
    const savedTitle = localStorage.getItem("title");
    const savedTitleSize = localStorage.getItem("titleSize");
    const savedSublink = localStorage.getItem("sublink");
    const savedButtonSize = localStorage.getItem("buttonSize");

    if (savedTitle) setTitle(savedTitle);
    if (savedTitleSize) setTitleSize(savedTitleSize);
    if (savedSublink) setLink(savedSublink);
    if (savedButtonSize) setButtonSize(savedButtonSize);
  }, []);
  */

  const handleContentChange = (
    label: string,
    newContent: string,
    newSize?: string
  ) => {
    if (label === "Title") {
      setTitle(newContent);
      if (newSize) setTitleSize(newSize);
      localStorage.setItem("title", newContent);
      localStorage.setItem("titleSize", newSize || titleSize);
    } else if (label === "Button") {
      setLink(newContent);
      if (newSize) setButtonSize(newSize);
      localStorage.setItem("sublink", newContent);
      localStorage.setItem("buttonSize", newSize || buttonSize);
    } else if (label === "Home") {
      setNavLink1(newContent);
      if (newSize) setNavLinkSize1(newSize);
      localStorage.setItem("Home", newContent);
      localStorage.setItem("navLinkSize1", newSize || navLinkSize1);
    } else if (label === "Default") {
      setNavLink2(newContent);
      if (newSize) setNavLinkSize2(newSize);
      localStorage.setItem("Default", newContent);
      localStorage.setItem("navLinkSize2", newSize || navLinkSize2);
    } else if (label === "NavLinkUrl1") {
      setNavLinkUrl1(newContent);
      localStorage.setItem("navLinkUrl1", newContent);
    } else if (label === "NavLinkUrl2") {
      setNavLinkUrl2(newContent);
      localStorage.setItem("navLinkUrl2", newContent);
    }
    setIsEdited(true);
  };

  const handleImageChange = async (label: string, newimage1: string) => {
    // Handle other images similarly
    localStorage.setItem(label.toLowerCase(), newimage1);
    setIsEdited(true);
    setEditImageLabel(null);
  };

  const handleSave = () => {
    const data = {
      title,
      sublink,
      titleSize,
      buttonSize,
      navLink1,
      navLink2,
      logoImage,
      secondaryImage,
      opacity,
      height,
      position,
      textAlign,
      isChecked,
    };
  
    // Save data in localStorage
    localStorage.setItem("savedPageData", JSON.stringify(data));

    setTimeout(() => {
      setShowPopup(true);
      setFadeOut(false);
  
      setTimeout(() => {
        setFadeOut(true); // Start fade out effect
        setTimeout(() => {
          setShowPopup(false);
        }, 700); // Time for the fade-out effect
      }, 1500); // Time the success message remains visible before fade out
    }, 1000);
  
    console.log("Data saved in localStorage:", data);
  };

  const handleEditClick = (label: string) => {
    console.log("Switching to edit text:", label);
    setEditLabel(label);
    setEditImageLabel(null);
  };

  const handleImageClick = (label: string) => {
    console.log("Switching to edit image:", label);
    setEditImageLabel(label);
    setEditLabel(null);
  };

  return (
    <OtherLayout
      headerSections={[
        { label: "Home", content: navLink1 },
        { label: "Default", content: navLink2 },
      ]}
      sections={[
        { label: "Title", content: title },
        { label: "Button", content: sublink },
      ]}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      opacity={opacity}
      setOpacity={setOpacity}
      position={position}
      setPosition={setPosition}
      textAlign={textAlign}
      setTextAlign={setTextAlign}
      height={height}
      setHeight={setHeight}
      onContentChange={handleContentChange}
      onSave={handleSave}
      isSaveEnabled={isEdited}
      editLabel={editLabel}
      editImageLabel={editImageLabel} // Pass down the image edit label
      onEditClick={handleEditClick}
      onEditImageClick={handleImageClick} // Pass down the image click handler
      titleSize={titleSize}
      buttonSize={buttonSize}
      navLinkSize1={navLinkSize1}
      navLinkSize2={navLinkSize2}
      handleVisibility={handleVisibility}
      handleBtnVisibility={handleBtnVisibility}
      handleNavVisibility={handleNavVisibility}
      handleDivVisibility={handleDivVisibility}
      handleFooterVisibility={handleFooterVisibility}
    >
      <button
        className="bg-neutral-800 hover:bg-neutral-900 text-white py-[9px] leading-[1] px-4 rounded-lg absolute z-[55] top-4 right-36 text-sm"
        onClick={handleSave} // Trigger save on click
      >
        Save
      </button>
      {showPopup && (
        <div
          className={`fixed z-[9] translate-x-[-50%] left-[50%] bg-green-500 text-white py-2 px-6 rounded transition-opacity duration-500 ease-in-out ${
            fadeOut ? "opacity-0 top-[-20px]" : "opacity-100 top-5"
          }`}
          style={{
            transition: "all .7s ease-in-out", // Adding inline style for transition
          }}
        >
          Saved successfully!
        </div>
      )}
      {loading && <LoadingSpinner />}
      {isNavVisible && (
        <nav className="bg-white px-12 rounded-t-lg text-[#303030] py-4 shadow z-[9]">
          <div className="max-w-[1300px] mx-auto flex items-center justify-center">
            <div className="w-[20%] text-center">
              <img src="/wow.svg" alt="Logo" className="cursor-pointer" />
            </div>
            <div className="w-[70%] flex gap-6">
              <a
                className={`hover:outline outline-[2px] outline-blue-500 ${navLinkSize1}`} // Use navLinkSize1 dynamically
                href="#"
                onClick={(event) => {
                  event.preventDefault(); // Prevent the default anchor behavior
                  handleEditClick("Home");
                }}
              >
                {navLink1}
              </a>
              <a
                className={`hover:outline outline-[2px] outline-blue-500 ${navLinkSize2}`} // Use navLinkSize2 dynamically
                href="#"
                onClick={(event) => {
                  event.preventDefault(); // Prevent the default anchor behavior
                  handleEditClick("Default");
                }}
              >
                {navLink2}
              </a>
            </div>
            <div className="w-[10%] flex gap-5 text-right">
              <img src="/search.svg" alt="Search" className="cursor-pointer" />
              <img
                src="/profile.svg"
                alt="Profile"
                className="cursor-pointer"
              />
              <img src="/shop.svg" alt="Shop" className="cursor-pointer" />
            </div>
          </div>
        </nav>
      )}
      {isDivVisible && (
        <div className="relative text-white">
          <div className="absolute flex h-full w-full text-white">
            <img
              src={logoImage}
              alt="Logo"
              className={`h-full object-cover cursor-pointer ${
                secondaryImage ? "w-1/2" : "w-full"
              }`}
            />
            {secondaryImage && (
              <img
                src={secondaryImage || "default2.png"}
                alt="Secondary Image"
                className="h-full w-1/2 object-cover"
              />
            )}
          </div>
          <div
            className="h-full w-full absolute z-2 bg-black"
            style={{ opacity }}
          ></div>
          <div
            className={`hover:outline outline-[2px] outline-blue-500 flex relative flex-col z-2 p-10 cursor-pointer ${sizeToHeight[height]} ${position}`}
            onClick={() => handleImageClick("Logo")}
          >
            <div
              className={`p-8 ${textAlign} ${isChecked ? "bg-sky-950" : ""}`}
            >
              {isTitleVisible && (
                <h1
                  className={`hover:outline outline-[3px] outline-blue-500 mb-10 text-center ${titleSize} font-semibold cursor-pointer`}
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent the event from bubbling
                    handleEditClick("Title");
                  }}
                >
                  {title}
                </h1>
              )}
              {isBtnVisible && (
                <a
                  className={`hover:outline outline-[3px] outline-blue-500 border py-2 px-6 cursor-pointer ${buttonSize}`}
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation(); // Prevent the event from bubbling
                    handleEditClick("Button");
                  }}
                >
                  {sublink || "Loading Button..."}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {isFooterVisible && (
        <footer className="bg-white py-10 rounded-b-lg">
          <div className="flex text-lg gap-6 flex-col items-center border-b pb-12">
            <p>Subsribe to our emails</p>
            <form className="relative w-[300px]">
              <input
                type="text"
                placeholder="Email"
                className="text-sm border w-full text-neutral-700 border-neutral-600 py-3 pl-4 pr-10 hover:outline outline-1" // Adjusted padding on the right
              />
              <button className="absolute text-neutral-500 inset-y-0 right-0 flex items-center justify-center w-12 h-12">
                →
              </button>
            </form>
          </div>
          <div className="max-w-[1300px] mx-auto flex gap-1 px-12 mt-14">
            <p className="text-xs opacity-60">© 2024,</p>
            <p className="text-xs opacity-60 hover:underline hover:opacity-100 cursor-pointer">
              My Store
            </p>
            <p className="text-xs opacity-60 hover:underline hover:opacity-100 cursor-pointer">
              Powered by Shopify
            </p>
            <p className="text-xs mx-2 opacity-60">.</p>
            <p className="text-xs opacity-60 hover:underline hover:opacity-100 cursor-pointer">
              Powered by Shopify
            </p>
          </div>
        </footer>
      )}
    </OtherLayout>
  );
}
