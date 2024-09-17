// components/embeds.tsx
export default function Embeds() {
  return (
    <aside className="bg-white text-[#303030] w-[300px]">
      <h2 className="border-b px-4 font-semibold py-4">App embeds</h2>
      <div className="p-4 w-full border-b">
        <div className="relative w-full">
          <form>
            <label
              className="absolute inset-y-0 left-3 flex items-center"
              htmlFor="search"
            >
              <img src="/search.svg" alt="Search" className="w-4 h-4" />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search app embeds..."
              className="text-sm border w-full text-neutral-700 border-neutral-600 py-1 pl-10 pr-4 rounded-lg hover:bg-neutral-100"
            />
          </form>
        </div>
      </div>
      <div className="p-4 w-full">
        <div className="mb-8">
          <p className="text-sm max-w-[250px] text-neutral-500">
            You don’t have any apps with embeds installed. Find apps built for
            Online Store 2.0 themes on the{" "}
            <a
              className="text-blue-600 underline"
              href="https://dopweb.com/"
              target="_blank"
            >
              Shopify App Store.
            </a>
          </p>
        </div>
        <p className="font-semibold text-[14px] text-[#303030]">
          Recommended apps with embeds
        </p>
        <div className="relative w-[fit-content] border mt-2 border-neutral-200 rounded-lg p-3">
          <input
            type="file"
            className="absolute cursor-pointer inset-0 h-full opacity-0 z-50"
            accept="image/*"
          />
          <div className="text-center flex gap-3 items-center">
            <img className="rounded-lg border" src="/sinbox.svg" alt="logo" />
            <div className="text-left">
              <p className="text-xs text-neutral-600">Shopify Inbox</p>
              <p className="text-xs text-neutral-600">4.8 ★ Free</p>
            </div>
            <img
              className="rounded-lg ml-3 p-1 border"
              src="/upload.svg"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}