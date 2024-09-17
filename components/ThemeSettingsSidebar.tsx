import { useState } from "react";

export default function ThemeSettingsSidebar() {
  const items = [
    "Logo",
    "Color",
    "Typography",
    "Layout",
    "Buttons",
    "Animations",
    "Inputs",
    "Product cards",
    "Collection cards",
    "Blog cards",
    "Content containers",
    "Media",
    "Drawers",
    "Badges",
    "Cart",
    "Checkout",
  ];

  // State to track which accordion item is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [value, setValue] = useState(120);
  const [maxvalue, setmaxValue] = useState(100);
  const [values, setValues] = useState(1200);
  const [valu, setValu] = useState(0);
  const [valuey, setValuey] = useState(8);
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      setOpenIndex(index); // Open the clicked accordion
    }
  };

  const handleChangerange = (event: any) => {
    setValue(event.target.value);
  };

  const handlemaxChangerange = (event: any) => {
    setmaxValue(event.target.value);
  };

  const handleChangeranges = (event: any) => {
    setValues(event.target.value);
  };

  const handleChangerang = (event: any) => {
    setValu(event.target.value);
  };

  const handleChangerangey = (event: any) => {
    setValuey(event.target.value);
  };

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  return (
    <aside
      className="bg-white text-[#303030] w-[300px] overflow-y-scroll"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <h2 className="border-b px-4 font-semibold py-4">Theme settings</h2>
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => toggleAccordion(index)} // Handle click for accordion
              className="cursor-pointer hover:bg-neutral-100 px-4 border-b flex py-3 justify-between items-center"
            >
              <p className="font-semibold text-sm">{item}</p>
              <p
                className={`transform transition-transform duration-200 text-lg text-neutral-500 ${
                  openIndex === index ? "rotate-[270deg]" : "rotate-90"
                }`}
              >
                ›
              </p>
            </div>
            {openIndex === index && (
              <div className="px-4 py-2">
                {(item === "Logo" || item === "Checkout") && (
                  <div className="mb-5">
                    <div className="flex w-full justify-between">
                      <p className="text-sm text-[#303030]">Logo</p>
                      <img src="data.svg" alt="dataimg" />
                    </div>
                    <div className="relative border-2 mt-2 border-gray-300 border-dashed rounded-lg p-6">
                      <input
                        type="file"
                        className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                        accept="image/*"
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
                    <div className="mt-5 w-full">
                      <p className="text-sm text-[#303030] mb-2">
                        Desktop logo width
                      </p>
                      <div className="flex justify-between">
                        <input
                          id="range1"
                          type="range"
                          min="0"
                          max="300"
                          className="mt-2 w-[70%]"
                          value={value}
                          onChange={handleChangerange}
                        />
                        <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                          {value} px
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="flex w-full justify-between">
                        <p className="text-sm text-[#303030]">Favicon image</p>
                        <img src="data.svg" alt="dataimg" />
                      </div>
                      <div className="relative border-2 mt-2 border-gray-300 border-dashed rounded-lg p-6">
                        <input
                          type="file"
                          className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                          accept="image/*"
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
                      <p className="text-sm text-neutral-500 mt-2">
                        Will be scaled down to 32 x 32px
                      </p>
                    </div>
                  </div>
                )}

                {item === "Color" && (
                  <div>
                    <h3 className="font-semibold text-sm text-neutral-700">
                      Schemes
                    </h3>
                    <p className="text-sm my-3 text-neutral-500">
                      Color schemes can be applied to sections throughout your
                      online store.
                    </p>
                    <div className="flex flex-wrap mt-2">
                      <div className="w-1/2 pr-2 text-center">
                        <div className="w-full p-2 border rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl text-black">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-black rounded"></div>
                            <div className="h-2 w-4 border border-black rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 1
                        </p>
                      </div>
                      <div className="w-1/2 pl-2 text-center">
                        <div className="w-full p-2 border bg-neutral-100 rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl text-black">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-black rounded"></div>
                            <div className="h-2 w-4 border border-black rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 2
                        </p>
                      </div>
                      <div className="w-1/2 pr-2 text-center mt-4">
                        <div className="w-full p-2 border bg-gray-800 rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl text-white">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-white rounded"></div>
                            <div className="h-2 w-4 border border-white rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 3
                        </p>
                      </div>
                      <div className="w-1/2 pl-2 text-center mt-4">
                        <div className="w-full p-2 border bg-black rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl text-white">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-white rounded"></div>
                            <div className="h-2 w-4 border border-white rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 4
                        </p>
                      </div>
                      <div className="w-1/2 pr-2 text-center mt-4">
                        <div className="w-full p-2 border bg-blue-800 rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl text-white">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-white rounded"></div>
                            <div className="h-2 w-4 border border-white rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 5
                        </p>
                      </div>
                      <div className="w-1/2 pl-2 text-center mt-4">
                        <div className="w-full p-2 border rounded-lg flex flex-col justify-center items-center">
                          <p className="text-2xl">Aa</p>
                          <div className="flex my-1 gap-1">
                            <div className="h-2 w-4 bg-black rounded"></div>
                            <div className="h-2 w-4 border border-black rounded"></div>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">
                          Scheme 6
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(item === "Typography" || item === "Cart" || item === "Badges") && (
                  <div className="mb-5">
                    <h3 className="font-semibold mb-5 mt-2 text-sm text-neutral-700">
                      Headings
                    </h3>
                    <div className="flex w-full justify-between">
                      <p className="text-sm text-[#303030]">Font</p>
                      <img src="data.svg" alt="dataimg" />
                    </div>
                    <div className="relative mt-2 bg-neutral-100 border rounded-lg py-2 px-4">
                      <input
                        type="file"
                        className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                        accept="image/*"
                      />
                      <div className="">
                        <p className="mt-1 text-xl font-light text-neutral-800">
                          Assistant
                        </p>
                        <p className="mt-2 text-sm text-neutral-800 mb-4">
                          Regular
                        </p>
                        <h3 className="my-2 text-[13px] flex text-center font-medium text-gray-900">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer w-full bg-white border shadow text-neutral-900 py-1 px-2 rounded-lg hover:bg-neutral-100"
                          >
                            Change
                            <input
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-500 mt-2">
                      Selecting a different font can affect the speed of your
                      store.
                    </p>
                    <a className="text-sm text-blue-600 underline mt-2" href="">
                      Learn more about system fonts.
                    </a>
                    <div className="mt-5 w-full">
                      <p className="text-sm text-[#303030] mb-2">
                        Font size scale
                      </p>
                      <div className="flex justify-between">
                        <input
                          id="range1"
                          type="range"
                          min="0"
                          max="300"
                          className="mt-2 w-[70%]"
                          value={value}
                          onChange={handleChangerange}
                        />
                        <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                          {value} %
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <h3 className="font-semibold my-2 text-sm text-neutral-700">
                        Body
                      </h3>
                      <div className="flex w-full justify-between">
                        <p className="text-sm text-[#303030]">Font</p>
                        <img src="data.svg" alt="dataimg" />
                      </div>
                      <div className="relative mt-2 bg-neutral-100 border rounded-lg py-2 px-4">
                        <input
                          type="file"
                          className="absolute cursor-pointer inset-0 w-full h-full opacity-0 z-50"
                          accept="image/*"
                        />
                        <div className="">
                          <p className="mt-1 text-xl font-light text-neutral-800">
                            Assistant
                          </p>
                          <p className="mt-2 text-sm text-neutral-800 mb-4">
                            Regular
                          </p>
                          <h3 className="my-2 text-[13px] flex text-center font-medium text-gray-900">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer w-full bg-white border shadow text-neutral-900 py-1 px-2 rounded-lg hover:bg-neutral-100"
                            >
                              Change
                              <input
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-500 mt-2">
                        Selecting a different font can affect the speed of your
                        store.
                      </p>
                      <a
                        className="text-sm text-blue-600 underline mt-2"
                        href=""
                      >
                        Learn more about system fonts.
                      </a>
                    </div>
                  </div>
                )}

                {item === "Layout" && (
                  <div className="mt-5 w-full">
                    <p className="text-sm text-[#303030] mb-1">Page width</p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="1000"
                        max="1600"
                        className="mt-2 w-[65%]"
                        value={values}
                        onChange={handleChangeranges}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {values} px
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Space between template sections
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="100"
                        className="mt-2 w-[70%]"
                        value={valu}
                        onChange={handleChangerang}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valu} px
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#303030] mt-6 mb-1">
                      Grid
                    </p>
                    <p className="text-sm text-neutral-500 mt-2 mb-1">
                      Affects areas with multiple columns or rows.
                    </p>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Horizontal space
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="40"
                        className="mt-2 w-[70%]"
                        value={valuey}
                        onChange={handleChangerangey}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valuey} px
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Vertical space
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="40"
                        className="mt-2 w-[70%]"
                        value={valuey}
                        onChange={handleChangerangey}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valuey} px
                      </span>
                    </div>
                  </div>
                )}

                {(item === "Buttons" || item === "Inputs" || item === "Content containers" || item === "Media" || item === "Drawers") && (
                  <div className="mt-5 w-full">
                    <p className="text-sm text-[#303030] mb-1">Page width</p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="12"
                        className="mt-2 w-[65%]"
                        value={valu}
                        onChange={handleChangerang}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valu} px
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">Opacity</p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="100"
                        className="mt-2 w-[70%]"
                        value={maxvalue}
                        onChange={handlemaxChangerange}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {maxvalue} %
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Corner radius
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="100"
                        className="mt-2 w-[70%]"
                        value={valu}
                        onChange={handleChangerang}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valu} px
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#303030] mt-6 mb-1">
                      Shadow
                    </p>
                    <p className="text-sm text-[#303030] mt-6 mb-1">Opacity</p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="100"
                        className="mt-2 w-[70%]"
                        value={valu}
                        onChange={handleChangerang}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valu} %
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Horizontal offset
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="40"
                        className="mt-2 w-[70%]"
                        value={valuey}
                        onChange={handleChangerangey}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valuey} px
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">
                      Vertical offset
                    </p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="40"
                        className="mt-2 w-[70%]"
                        value={valuey}
                        onChange={handleChangerangey}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valuey} px
                      </span>
                    </div>
                    <p className="text-sm text-[#303030] mt-6 mb-1">Blur</p>
                    <div className="flex justify-between">
                      <input
                        id="range1"
                        type="range"
                        min="0"
                        max="40"
                        className="mt-2 w-[70%]"
                        value={valuey}
                        onChange={handleChangerangey}
                      />
                      <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                        {valuey} px
                      </span>
                    </div>
                  </div>
                )}

                {item === "Animations" && (
                  <div>
                    <div className="mt-5 mb-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked />
                        <p className="text-sm text-neutral-600">
                          Reveal sections on scroll
                        </p>
                      </label>
                    </div>
                    <div className="mt-5 mb-2">
                      <p className="text-sm text-neutral-600 mb-2">
                        Hover effect
                      </p>
                      <div className="bg-neutral-100 flex p-1 rounded-lg">
                        {["None", "Vertical lift", "3D lift"].map(
                          (label, index) => (
                            <button
                              key={index}
                              onClick={() => handleButtonClick(index)}
                              className={`py-1 px-2 rounded w-[33.33%] text-xs text-neutral-600 ${
                                selectedButton === index
                                  ? "bg-white"
                                  : "bg-neutral-100"
                              }`}
                            >
                              {label}
                            </button>
                          )
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 my-1">
                        Affects cards and buttons.
                      </p>
                    </div>
                  </div>
                )}

                {(item === "Product cards" || item === "Collection cards" || item === "Blog cards") && (
                  <div>
                    <div className="mt-5 mb-2">
                      <p className="text-sm text-neutral-600 mb-2">Style</p>
                      <div className="bg-neutral-100 flex p-1 rounded-lg">
                        {["Standard", "Card"].map((label, index) => (
                          <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={`py-1 px-2 rounded w-1/2 text-xs text-neutral-600 ${
                              selectedButton === index
                                ? "bg-white"
                                : "bg-neutral-100"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <p className="text-sm text-[#303030] mb-1">Image padding</p>
                      <div className="flex justify-between">
                        <input
                          id="range1"
                          type="range"
                          min="0"
                          max="12"
                          className="mt-2 w-[65%]"
                          value={valu}
                          onChange={handleChangerang}
                        />
                        <span className="text-sm text-[#303030] rounded-lg border border-neutral-500 py-1 px-2">
                          {valu} px
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 mb-2">
                      <p className="text-sm text-neutral-600 mb-2">
                        Text alignment
                      </p>
                      <div className="bg-neutral-100 flex p-1 rounded-lg">
                        {["Left", "Center", "Right"].map((label, index) => (
                          <button
                            key={index}
                            onClick={() => handleButtonClick(index)}
                            className={`py-1 px-2 rounded w-1/2 text-xs text-neutral-600 ${
                              selectedButton === index
                                ? "bg-white"
                                : "bg-neutral-100"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
