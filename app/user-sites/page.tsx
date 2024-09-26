// app/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleRedirect = () => {
    router.push("/landing-page");
  };

  return (
    <div className="h-[calc(100vh_-_64px)] text-neutral-800 flex overflow-hidden relative justify-center bg-neutral-900 p-1">
      <div className="w-full bg-neutral-100 rounded-xl h-full">
        <div className="py-2 px-3 flex justify-between border-b">
          <div className="flex gap-3">
            <img className="h-[20px] w-[20px]" src="shop.webp" alt="" />
            <p className="text-sm">Online Store</p>
          </div>
          <div className="flex gap-1 items-center">
            <img
              className="cursor-pointer"
              src={isToggled ? "notpinged.svg" : "pinged.svg"}
              alt=""
              onClick={handleToggle}
            />
            <img className="cursor-pointer" src="dots.svg" alt="" />
          </div>
        </div>
        <div className="container mx-auto py-20 max-w-[1000px]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-1 text-neutral-800">
              Themes
            </h1>
            <div
              className="flex gap-2 bg-neutral-200 items-center h-fit px-2 py-1 rounded-lg hover:bg-neutral-300 cursor-pointer"
              onClick={handleRedirect}
            >
              <img className="w-[20px] h-[20px]" src="eye.svg" alt="" />
              <p className="text-sm">View your store</p>
            </div>
          </div>
          <div className="px-4 py-6 mt-3 bg-white border rounded-lg shadow-sm h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 w-fit bg-[#d5ebff] rounded-lg">
                <img src="theme.svg" alt="" />
              </div>
              <div className="">
                <p className="text-sm font-semibold">My Sites</p>
                <p className="text-sm text-neutral-700">
                  Select a site to edit, view and open its dashboard.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="border rounded-lg w-fit py-1">
                <img
                  className="cursor-pointer"
                  src="lp.png"
                  alt=""
                  onClick={handleRedirect}
                />
                <div className="px-4 pb-3 pt-4 flex justify-between border-t">
                  <div className="w-fit">
                    <p
                      className="text-sm cursor-pointer font-semibold text-blue-500 underline mb-1"
                      onClick={handleRedirect}
                    >
                      Dopweb
                    </p>
                    <p className="text-sm text-neutral-600">by Dopweb</p>
                  </div>
                  <div className="">
                    <button
                      className="border rounded-lg shadow text-sm py-1 px-3 hover:bg-neutral-800 hover:text-white"
                      onClick={handleRedirect}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg py-1 w-[290px] text-center flex items-center justify-center flex-col gap-3">
                <button className="border rounded-full shadow h-[55px] w-[55px] flex items-center justify-center hover:bg-neutral-800 hover:text-white">
                  <span className="text-2xl mt-[-2px]">+</span>
                </button>
                <div className="w-fit">
                  <p className="text-sm font-semibold mb-1">New Site</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white border rounded-lg shadow-sm h-full">
            <div className="p-4 flex justify-between items-center border-b">
              <p className="text-sm font-semibold">Theme library</p>
              <p
                className="text-sm text-neutral-700 border rounded-lg px-3 py-1 shadow hover:bg-neutral-800 hover:text-white cursor-pointer"
                onClick={handleRedirect}
              >
                Edit theme
              </p>
            </div>
            <div className="p-4">
              <p className="text-sm text-center p-5 bg-neutral-100">
                Try out new themes, work on seasonal versions, or test changes
                to your current theme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
