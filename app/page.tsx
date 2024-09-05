// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import OtherLayout from "../components/dashboard";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from "./utils/supabaseClient";
import "./globals.css";

export default function HomePage() {
  const [title, setTitle] = useState<string>("");
  const [sublink, setLink] = useState<string>("");
  const [initialTitle, setInitialTitle] = useState<string>("");
  const [initialSublink, setInitialSublink] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState<string>("text-4xl");
  const [buttonSize, setButtonSize] = useState<string>("text-lg");
  const [loading, setLoading] = useState<boolean>(true);
  const [navLink1, setNavLink1] = useState<string>("Home");
  const [navLink2, setNavLink2] = useState<string>("Default");
  const [navLinkUrl1, setNavLinkUrl1] = useState<string>("");
  const [navLinkUrl2, setNavLinkUrl2] = useState<string>("");
  const [navLinkSize1, setNavLinkSize1] = useState<string>("text-sm");
  const [navLinkSize2, setNavLinkSize2] = useState<string>("text-sm");
  const [logoImage, setLogoImage] = useState<string>("");
  const [editImageLabel, setEditImageLabel] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*")
          .single(); // Assuming you expect only one row
        console.log(data);

        if (error) {
          console.error("Error fetching content:", error);
          throw new Error("Failed to fetch data");
        }

        if (data) {
          const imageUrl = data.image1.startsWith("http")
            ? data.image1
            : `${data.image1}`;
          setTitle(data.title || "Default Title");
          setLink(data.sublink || "Default Link");
          setTitleSize(data.titleSize || "text-4xl");
          setButtonSize(data.buttonSize || "text-lg");
          setLogoImage(imageUrl);
        } else {
          console.warn("No data returned from Supabase");
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    loadData();
  }, []);

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
    } else if (label === "NavLink1") {
      setNavLink1(newContent);
      if (newSize) setNavLinkSize1(newSize);
      localStorage.setItem("navLink1", newContent);
      localStorage.setItem("navLinkSize1", newSize || navLinkSize1);
    } else if (label === "NavLink2") {
      setNavLink2(newContent);
      if (newSize) setNavLinkSize2(newSize);
      localStorage.setItem("navLink2", newContent);
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
    if (label === "Logo") {
      setLogoImage(newimage1);
      // Add logic to update Supabase here if needed
    }
    // Handle other images similarly
    localStorage.setItem(label.toLowerCase(), newimage1);
    setIsEdited(true);
    setEditImageLabel(null);
  };

  const handleSave = async () => {
    const data = { title, sublink, titleSize, buttonSize };

    console.log("Data to save:", data); // Debug log

    try {
      const res = await fetch("/api/saveContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log("Content saved successfully");
        setInitialTitle(title);
        setInitialSublink(sublink);
        setIsEdited(false);
      } else {
        const errorData = await res.json();
        console.error("Failed to save content:", errorData.message); // Display detailed error message
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
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
        { label: "NavLink1", content: navLink1 },
        { label: "NavLink2", content: navLink2 },
      ]}
      sections={[
        { label: "Image", content: logoImage },
        { label: "Title", content: title },
        { label: "Button", content: sublink },
      ]}
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
    >
      {loading && <LoadingSpinner />}
      <nav className="bg-white px-12 container text-[#303030] py-4 shadow z-[9]">
        <div className="flex items-center justify-center">
          <div className="w-[20%] text-center">
            <img
              src="/wow.svg"
              alt="Logo"
              className="cursor-pointer"
              onClick={() => handleImageClick("Logo")}
            />
          </div>
          <div className="w-[70%] flex gap-6">
            <a
              className={`hover:outline outline-[2px] outline-blue-500 ${navLinkSize1}`} // Use navLinkSize1 dynamically
              href="#"
              onClick={(event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                handleEditClick("NavLink1");
              }}
            >
              {navLink1}
            </a>
            <a
              className={`hover:outline outline-[2px] outline-blue-500 ${navLinkSize2}`} // Use navLinkSize2 dynamically
              href="#"
              onClick={(event) => {
                event.preventDefault(); // Prevent the default anchor behavior
                handleEditClick("NavLink2");
              }}
            >
              {navLink2}
            </a>
          </div>
          <div className="w-[10%] flex gap-5 text-right">
            <img src="/search.svg" alt="Search" className="cursor-pointer" />
            <img src="/profile.svg" alt="Profile" className="cursor-pointer" />
            <img src="/shop.svg" alt="Shop" className="cursor-pointer" />
          </div>
        </div>
      </nav>
      <div className="bg-[url()] relative text-white">
        <img
          src={logoImage}
          alt="Logo"
          className="h-full w-full absolute cursor-pointer object-cover"
          onClick={() => handleImageClick("Logo")}
        />
        <div className="h-full w-full bg-black absolute opacity-20"></div>
        <div className="flex min-h-[40vh] relative gap-6 flex-col justify-center items-center z-2 p-10">
          <h1
            className={`hover:outline outline-[3px] outline-blue-500 text-center ${titleSize} font-semibold cursor-pointer`}
            onClick={() => handleEditClick("Title")}
          >
            {title || "Loading Title..."}
          </h1>
          {logoImage}
          <a
            className={`hover:outline outline-[3px] outline-blue-500 border-2 py-2 px-6 cursor-pointer ${buttonSize}`}
            href=""
            onClick={(event) => {
              event.preventDefault();
              handleEditClick("Button");
            }}
          >
            {sublink || "Loading Button..."}
          </a>
        </div>
      </div>
    </OtherLayout>
  );
}
