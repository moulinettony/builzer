// app/layout.tsx
"use client";
import { ReactNode, useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  /*const handleSave = async () => {
    const title = localStorage.getItem("title");
    const sublink = localStorage.getItem("sublink");
    const titleSize = localStorage.getItem("titleSize") || "text-4xl";
    const buttonSize = localStorage.getItem("buttonSize") || "text-4xl";
  
    console.log('Saving content:', { title, sublink, titleSize, buttonSize });
  
    try {
      const res = await fetch('/api/saveContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, sublink, titleSize, buttonSize }),
      });
  
      if (res.ok) {
        console.log('Content saved successfully');
        setShowPopup(true); 
        setFadeOut(false); 
        
        setTimeout(() => {
          setFadeOut(true); // Start fade out effect
          setTimeout(() => {
            setShowPopup(false);
          }, 700); 
        }, 1500);
      } else {
        // Log the error message returned from the API
        const errorData = await res.json(); // Get the error message from response
        console.error('Failed to save content:', errorData); // Log the error response
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };*/

  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <nav className="bg-white px-12 text-[#303030] py-4 shadow z-[9]">
          <div className="flex items-center justify-center">
            <div className="w-[10%] text-center">
              <img src="/logo.svg" alt="" />
            </div>
            <div className="w-[80%] flex items-center justify-center gap-6">
              <a className="font-semibold text-sm" href="">
                Default
              </a>
              <div className="h-[1rem] w-[1px] bg-[#9f9f9f]"></div>
              <a className="font-semibold text-sm" href="">
                Home Page
              </a>
            </div>
            <div className="w-[10%] text-right">
              <button
                //onClick={handleSave}
                className="bg-neutral-800 text-white py-2 leading-[1] px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </nav>
        <div className="flex flex-1">
          <main className="flex-1">{children}</main>
        </div>
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
      </body>
    </html>
  );
}
