// app/new-page/page.tsx
import fs from "fs";
import path from "path";

export default async function NewPage() {
  // Load the saved data from the JSON file
  const filePath = path.join(process.cwd(), "data", "new-page.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);

  // Define sizeToHeight mapping for height values
  const sizeToHeight: { [key in "small" | "medium" | "large"]: string } = {
    small: "h-[40vh]",
    medium: "h-[60vh]",
    large: "h-[80vh]",
  };

  // Safely check that data.height is one of the valid keys ("small", "medium", or "large")
  const validHeights = ["small", "medium", "large"] as const; // Ensure it's typed correctly as a tuple of constant values

  // Use type narrowing to confirm it's one of the allowed values
  const height: "small" | "medium" | "large" = validHeights.includes(
    data.height
  )
    ? data.height
    : "medium";

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white px-12 rounded-t-lg text-[#303030] py-4 shadow z-[9]">
        <div className="max-w-[1300px] mx-auto flex items-center justify-center">
          <div className="w-[20%] text-center">
            <img src="/wow.svg" alt="Logo" className="cursor-pointer" />
          </div>
          <div className="w-[70%] flex gap-6">
            <a
              className={`hover:outline outline-[2px] outline-blue-500 ${data.navLinkSize1}`}
              href="#"
            >
              {data.navLink1}
            </a>
            <a
              className={`hover:outline outline-[2px] outline-blue-500 ${data.navLinkSize2}`}
              href="#"
            >
              {data.navLink2}
            </a>
          </div>
          <div className="w-[10%] flex gap-5 text-right">
            <img src="/search.svg" alt="Search" className="cursor-pointer" />
            <img src="/profile.svg" alt="Profile" className="cursor-pointer" />
            <img src="/shop.svg" alt="Shop" className="cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative text-white">
        <div className="absolute flex h-full w-full text-white">
          <img
            src={data.logoImage || "/wow.svg"}
            alt="Logo"
            className={`h-full object-cover cursor-pointer ${
              data.secondaryImage ? "w-1/2" : "w-full"
            }`}
          />
          {data.secondaryImage && (
            <img
              src={data.secondaryImage || "default2.png"}
              alt="Secondary Image"
              className="h-full w-1/2 object-cover"
            />
          )}
        </div>

        {/* Background overlay */}
        <div
          className="h-full w-full absolute z-2 bg-black"
          style={{ opacity: data.opacity }}
        ></div>

        {/* Editable content */}
        <div
          className={`hover:outline outline-[2px] outline-blue-500 flex relative flex-col z-2 p-10 cursor-pointer ${
            sizeToHeight[height]
          } ${data.position || "items-center justify-center"}`}
        >
          <div
            className={`p-8 ${data.textAlign} ${
              data.isChecked ? "bg-sky-950" : ""
            }`}
          >
            <h1
              className={`hover:outline outline-[3px] outline-blue-500 mb-10 text-center ${data.titleSize} font-semibold cursor-pointer`}
            >
              {data.title}
            </h1>
            <a
              className={`hover:outline outline-[3px] outline-blue-500 border py-2 px-6 cursor-pointer ${data.buttonSize}`}
              href="#"
            >
              {data.sublink || "Loading Button..."}
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 rounded-b-lg">
        <div className="flex text-lg gap-6 flex-col items-center border-b pb-12">
          <p>Subscribe to our emails</p>
          <form className="relative w-[300px]">
            <input
              type="text"
              placeholder="Email"
              className="text-sm border w-full text-neutral-700 border-neutral-600 py-3 pl-4 pr-10 hover:outline outline-1"
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
    </>
  );
}
