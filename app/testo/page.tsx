// app/standalone-page.tsx
"use client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useImageStore } from "../../components/useImageStore";
import "./../globals.css";
import { useState } from "react";
import Head from 'next/head';


export default function StandalonePage() {
  const [title, setTitle] = useState<string>("Browse our latest products");
  const [sublink, setLink] = useState<string>("Shop all");
  const [loading, setLoading] = useState<boolean>(false);
  const [navLink1, setNavLink1] = useState<string>("Home");
  const [navLink2, setNavLink2] = useState<string>("Default");
  const [navLinkSize1, setNavLinkSize1] = useState<string>("text-sm");
  const [navLinkSize2, setNavLinkSize2] = useState<string>("text-sm");
  const logoImage = useImageStore((state) => state.logoImage);
  const secondaryImage = useImageStore((state) => state.secondaryImage);
  const [opacity, setOpacity] = useState<number>(0.4);
  const [height, setHeight] = useState<"small" | "medium" | "large">("medium");
  const [position, setPosition] = useState<string>(
    "items-center justify-center"
  );
  const [textAlign, setTextAlign] = useState<string>("text-center");
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isBtnVisible, setIsBtnVisible] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const handleEditClick = (label: string) => {
    console.log("Switching to edit:", label);
  };

  return (
    <>
      <Head>
        <title>Standalone Page - Browse the Best Products</title>
        <meta name="description" content="Discover top-quality products on our standalone page." />
      </Head>
    <div>
      {loading && <LoadingSpinner />}
      <nav className="bg-white px-12 rounded-t-lg text-[#303030] py-4 shadow z-[9]">
        <div className="max-w-[1300px] mx-auto flex items-center justify-center">
          <div className="w-[20%] text-center">
            <img src="/wow.svg" alt="Logo" className="cursor-pointer" />
          </div>
          <div className="w-[70%] flex gap-6">
            <a
              className={` ${navLinkSize1}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEditClick("Home");
              }}
            >
              {navLink1}
            </a>
            <a
              className={` ${navLinkSize2}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleEditClick("Default");
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

      <div className="relative text-white h-[60vh]">
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
          className={`flex relative flex-col z-2 h-full p-10 cursor-pointer ${height} ${position}`}
        >
          <div className={`p-8 ${textAlign}`}>
            {isTitleVisible && (
              <h1 className="text-6xl font-semibold mb-6 cursor-pointer">
                {title}
              </h1>
            )}
            {isBtnVisible && (
              <a className="text-xl py-2 px-6 border" href="#">
                {sublink || "Loading Button..."}
              </a>
            )}
          </div>
        </div>
      </div>
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
    </div>
    </>
  );
}
