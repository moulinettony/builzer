import { useState } from "react";

interface CustomSidebarProps {
  isSidebarVisible: boolean;
  editContent: string | null;
  editImage: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangerange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: (index: number) => void;
  selectedLabel: string;
  titleSize: string;
  buttonSize: string;
  navLinkSize1: string;
  navLinkSize2: string;
  selectedButton: number;
  value: number;
  setIsSidebarVisible: (visible: boolean) => void;
}

export default function CustomSidebar({
  isSidebarVisible,
  editContent,
  editImage,
  handleChange,
  handleSizeChange,
  handleImageUpload,
  handleChangerange,
  handleButtonClick,
  selectedLabel,
  titleSize = "text-xl",
  buttonSize,
  navLinkSize1,
  navLinkSize2,
  selectedButton,
  value,
  setIsSidebarVisible,
}: CustomSidebarProps) {
  return (
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
              <img className="cursor-pointer" src="/textedit.svg" alt="logo" />
              <img className="cursor-pointer" src="/textedit1.svg" alt="logo" />
              <img className="cursor-pointer" src="/textedit2.svg" alt="logo" />
              <img className="cursor-pointer" src="/textedit3.svg" alt="logo" />
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
                onChange={handleImageUpload}
              />
              <div className="text-center">
                <h3 className="my-2 text-[13px] font-medium text-gray-900">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-gray-200 text-blue-600 py-1 px-2 rounded"
                  >
                    Select image
                    <input name="file-upload" type="file" className="sr-only" />
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
            <div className="mt-5 w-full">
              <p className="text-sm text-[#303030] mb-2">
                Image overlay opacity
              </p>
              <div className="flex justify-between">
                <input
                  id="range1"
                  type="range"
                  min="0"
                  max="100"
                  className="mt-2 w-[75%]"
                  value={value}
                  onChange={handleChangerange}
                />
                <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                  {value} %
                </span>
              </div>
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
              <p className="text-sm text-neutral-700 mb-2">
                Desktop content position
              </p>
              <select className="w-full px-3 py-1 text-neutral-600 text-[14px] hover:bg-neutral-100 border-neutral-600 border rounded-lg">
                <option value="">Top left</option>
                <option value="">Top center</option>
                <option value="">Top right</option>
                <option value="">Middle left</option>
                <option value="" selected>
                  Middle center
                </option>
                <option value="">Middle right</option>
                <option value="">Bottom left</option>
                <option value="">Bottom center</option>
                <option value="">Bottom right</option>
              </select>
            </div>
            <div className="mt-5 mb-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
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
                    onClick={() => handleButtonClick(index)}
                    className={`py-1 px-2 rounded w-[33.33%] text-sm text-neutral-600 ${
                      selectedButton === index ? "bg-white" : "bg-neutral-100"
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
              <p className="text-sm text-neutral-700 mb-2">Image behavior</p>
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
          </div>
        )}
      </div>
    </aside>
  );
}
