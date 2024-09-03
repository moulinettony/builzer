// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import OtherLayout from "../components/dashboard";
import "./globals.css";

async function fetchInitialData() {
  const res = await fetch("/data.json");
  if (!res.ok) {
    throw new Error("Failed to load data");
  }
  return res.json();
}

export default function HomePage() {
  const [title, setTitle] = useState<string>("");
  const [sublink, setLink] = useState<string>("");
  const [initialTitle, setInitialTitle] = useState<string>("");
  const [initialSublink, setInitialSublink] = useState<string>("");
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [editLabel, setEditLabel] = useState<string | null>(null);
  const [titleSize, setTitleSize] = useState<string>("text-4xl");
  const [buttonSize, setButtonSize] = useState<string>("text-lg");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setTitle(data.title || "Default Title");
        setLink(data.sublink || "Default Link");
        setTitleSize(data.titleSize || "text-4xl"); // Default to "text-4xl" if not specified
        setButtonSize(data.buttonSize || "text-lg"); // Default to "text-4xl" if not specified
      } catch (error) {
        console.error("Failed to load initial data:", error);
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
    }
    setIsEdited(true);
  };

  const handleSave = async () => {
    const data = { title, sublink };

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
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleEditClick = (label: string) => {
    setEditLabel(label);
  };

  return (
    <OtherLayout
      sections={[
        { label: "Title", content: title },
        { label: "Button", content: sublink },
      ]}
      onContentChange={handleContentChange}
      onSave={handleSave}
      isSaveEnabled={isEdited}
      editLabel={editLabel}
      onEditClick={handleEditClick}
      titleSize={titleSize} // Pass titleSize
      buttonSize={buttonSize} // Pass buttonSize
    >
      <div className="bg-[url(/Frame.svg)] relative text-white">
        <div className="h-full w-full bg-black absolute opacity-20"></div>
        <div className="flex min-h-[40vh] relative gap-6 flex-col justify-center items-center z-2 p-10">
          <h1
            className={`hover:outline outline-[3px] outline-blue-400 ${titleSize} font-semibold cursor-pointer`}
            onClick={() => handleEditClick("Title")}
          >
            {title}
          </h1>
          <a
            className={`hover:outline outline-[3px] outline-blue-400 border-2 py-2 px-6 cursor-pointer ${buttonSize}`}
            href=""
            onClick={(event) => {
              event.preventDefault();
              handleEditClick("Button");
            }}
          >
            {sublink}
          </a>
        </div>
      </div>
    </OtherLayout>
  );
}
