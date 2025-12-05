"use client";
import { useRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import Test from "./test/page";

export default function Home() {
  const testSection = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (testSection.current) {
      testSection.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans">
      <div
        className="flex min-h-screen items-center justify-center
                    bg-[url('/img/HairExpertBackground.jpg')] bg-[position:75%_0%] bg-no-repeat bg-cover md:bg-center xl:bg-[position:100%_100%]"
      >
        <nav className="flex flex-row justify-start absolute top-0 left-0 w-full h-20">
          <img src="/img/logo.png" alt="Logo" className="h-7 ml-28 mt-7" />
          <h2 className="ml-4 mt-7.5 text-lg font-semibold text-[#5b2882]">
            HairExpert
          </h2>
        </nav>

        <main className="flex w-full flex-col py-32 px-28 rounded-lg">
          <h1 className="text-4xl font-bold text-[#413D6C] md:text-5xl">
            Selamat Datang di
          </h1>
          <h1 className="text-4xl font-bold text-[#413D6C] mt-2 md:text-5xl">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              HairExpert System
            </span>
          </h1>
          <p className="mt-6 text-md text-[#413D6C] text-left max-w-md">
            Website ini membantu Anda mendapatkan saran ahli untuk perawatan
            rambut. Jawab beberapa pertanyaan test untuk menemukan penyebab
            kerontokan dan solusi terbaik bagi rambut Anda.
          </p>
          <div className="flex flex-row gap-4">
            <button
              onClick={handleStart}
              className="cursor-pointer flex items-center bg-[#8B5CF6] max-w-fit shadow-xl shadow-purple-500/40 rounded-4xl mt-8 px-12 py-2 text-white hover:bg-[#7244dd] hover:-translate-y-1 transition-all duration-300"
            >
              Mulai Test
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
            <button className="cursor-pointer flex items-center justify-center border border-[#bd5ee6] bg-white max-w-fit shadow-xl shadow-purple-500/40 rounded-4xl mt-8 px-12 py-2 text-[#413D6C] hover:bg-[#bd5ee6] hover:text-white hover:-translate-y-1 transition-all duration-300">
              Video Demo
              <VideoCameraIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
      </div>

      <div
        ref={testSection}
        className=" min-h-screen bg-[#E0AEF5]
             flex items-center justify-center px-4 "
      >
        <Test />
      </div>
      <footer className="w-full bg-[#E0AEF5] relative">
        <img
          src="/img/footer.png"
          alt="footer background"
          className="w-full bg-[#E0AEF5] object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 w-full px-28 py-4 flex justify-between items-center text-[#5b2882]">
          <div className="flex items-center gap-3 z-10">
            <img src="/img/logo-reverse.png" className="h-7 object-contain" />
            <span className="text-lg font-semibold">HairExpert</span>
          </div>

          <p className="text-sm opacity-80 text-right z-10">
            © 2025 HairExpert — Kelompok 4 RSBP (C)
          </p>
        </div>
      </footer>
    </div>
  );
}
