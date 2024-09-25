// app/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/landing-page");
  };

  const handleRedirect = () => {
    router.push("/landing-page");
  };

  return (
    <div className="min-h-screen text-neutral-800 flex overflow-hidden relative items-center justify-center bg-[#141414]">
      <div className="back_noise"></div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="bg-white z-[5] p-10 rounded-lg shadow-lg w-full max-w-[30rem]">
        <img className="mb-10" src="/logo.svg" alt="" />
        <h1 className="text-2xl font-semibold mb-1 text-neutral-800">Log in</h1>
        <p className="text-sm mb-6 text-neutral-500">
          Continue to Shopify account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-[#303030] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#303030] border border-gray-500 outline outline-[#303030] outline-[0.3px] text-white px-4 py-2 rounded-md shadow-sm hover:bg-neutral-900 focus:outline-none"
            >
              Continue with email
            </button>
            <a
              type="submit"
              className="w-full cursor-pointer mt-2 px-4 flex gap-2 justify-center text-sm py-[10px] rounded-md hover:bg-neutral-100 focus:outline-none"
              onClick={handleRedirect}
            >
              <span>
                <img src="key.svg" alt="" />
              </span>
              Sign in with passkey
            </a>
          </div>
        </form>
        <div className="mt-3">
          <p className="text-center flex justify-center items-center gap-3 font-light text-xm text-neutral-500">
            <span className="h-[1px] bg-neutral-200 w-[35%]"></span>
            or
            <span className="h-[1px] bg-neutral-200 w-[35%]"></span>
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <button
              className="flex items-center justify-center w-full bg-neutral-100 text-white p-4 rounded-md hover:bg-neutral-200"
              onClick={handleRedirect}
            >
              <img src="/apple.svg" alt="Apple" className="h-5 w-5 mr-2" />
            </button>
            <button
              className="flex items-center justify-center w-full bg-neutral-100 text-white p-4 rounded-md hover:bg-neutral-200"
              onClick={handleRedirect}
            >
              <img
                src="/facebook.svg"
                alt="Facebook"
                className="h-5 w-5 mr-2"
              />
            </button>
            <button
              className="flex items-center justify-center w-full bg-neutral-100 text-white p-4 rounded-md hover:bg-neutral-200"
              onClick={handleRedirect}
            >
              <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
            </button>
          </div>
        </div>
        <p className="my-8 text-xs font-light">
          New to Shopify?
          <a
            href="#"
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            Get started →
          </a>
        </p>
        <div className="flex gap-4">
          <p className="text-neutral-500 font-light text-xs hover:underline cursor-pointer">
            Help
          </p>
          <p className="text-neutral-500 font-light text-xs hover:underline cursor-pointer">
            privacy
          </p>
          <p className="text-neutral-500 font-light text-xs hover:underline cursor-pointer">
            Terms
          </p>
        </div>
      </div>
    </div>
  );
}
