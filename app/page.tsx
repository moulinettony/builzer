// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import OtherLayout from "../components/dashboard";
import LoadingSpinner from "../components/LoadingSpinner";
import { supabase } from './utils/supabaseClient'; 
import "./globals.css";

export async function fetchContent() {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .single(); // Assuming you expect only one row

    if (error) {
      console.error('Error fetching content:', error);
      throw new Error('Failed to fetch data');
    }

    console.log('Fetched content:', data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('Error in fetchContent function:', error);
    throw error;
  }
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchContent();
        if (data) {
          setTitle(data.title || "Default Title");
          setLink(data.sublink || "Default Link");
          setTitleSize(data.titleSize || "text-4xl");
          setButtonSize(data.buttonSize || "text-lg");
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
    }
    setIsEdited(true);
  };

  const handleSave = async () => {
    const data = { title, sublink, titleSize, buttonSize };
  
    console.log('Data to save:', data); // Debug log
  
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
      {loading && <LoadingSpinner />}
      <div className="bg-[url(/Frame.svg)] relative text-white">
        <div className="h-full w-full bg-black absolute opacity-20"></div>
        <div className="flex min-h-[40vh] relative gap-6 flex-col justify-center items-center z-2 p-10">
          <h1
            className={`hover:outline outline-[3px] text-center outline-blue-400 ${titleSize} font-semibold cursor-pointer`}
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
