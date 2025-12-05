"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import CardsSection from "../component/cardSection";
import Content from "../component/content";

interface DiagnosisDetail {
  name: string;
  message: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatment: string[];
  reference: string[];
}

export default function Result() {
  const [diagnosisDetails, setDiagnosisDetails] =
    useState<DiagnosisDetail | null>(null);
  const [lastNode, setLastNode] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const disease_name = searchParams.get("disease_name");
  console.log("Disease Name", disease_name);

  useEffect(() => {
    const saved = sessionStorage.getItem("lastNode");
    if (saved) setLastNode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/diagnosis_details/${disease_name}`
        );
        const djson: DiagnosisDetail = await res.json();
        if (!cancelled) {
          setDiagnosisDetails(djson);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [disease_name]);

  if (!diagnosisDetails) {
    return <p className="text-white text-2xl animate-pulse">Loading...</p>;
  }

  return (
    <div className="font-sans bg-[#fcf9ff] min-h-screen flex flex-col ">
      <img
        src="/img/top.png"
        alt="top"
        className="absolute top-0 left-0 w-full z-10"
      />
      <nav className="flex flex-row justify-start absolute top-0 left-0 w-full h-20 z-20">
        <img src="/img/logo.png" alt="Logo" className="h-7 ml-28 mt-7" />
        <h2 className="ml-4 mt-7.5 text-lg font-semibold text-[#5b2882]">
          HairExpert
        </h2>
      </nav>
      <div className="relative w-full top-15">
        <button
          onClick={() => router.push("/")}
          className="cursor-pointer absolute left-28 top-12 z-30 text-md font-semibold text-[#5b2882] 
               hover:text-[#fdf6ff] hover:-translate-x-1 transition-all duration-300 flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 inline-block mr-2" />
          Kembali
        </button>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 
                  z-30 text-5xl font-bold bg-white border-6 border-[#F6E6FC] 
                  hover:bg-[#F6E6FC] hover:border-white text-[#413D6C] 
                  px-16 py-6 rounded-full shadow-lg transition-all"
        >
          TEST RESULT
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex flex-col mx-auto max-w-4xl">
          <div className="text-left text-[#413D6C] z-20 mt-55 max-w-4xl p-6">
            <h1 className="text-3xl  font-bold">
              Hasil diagnosis sistem:
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {" " +
                  (diagnosisDetails.name === "null"
                    ? "Tidak Diketahui"
                    : diagnosisDetails.name)}
              </span>
            </h1>
            <div className="bg-white rounded-4xl p-8 mt-8 shadow-lg shadow-purple-500/20 flex flex-col gap-4">
              {lastNode?.message && (
                <p className="text-md text-[#413D6C]">{lastNode.message}</p>
              )}
              {diagnosisDetails.description && (
                <>
                  <h2 className="text-2xl font-bold">
                    {diagnosisDetails.name}
                  </h2>
                  <p className="text-md text-[#413D6C]">
                    {diagnosisDetails.description}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {diagnosisDetails.name !== "null" && (
          <>
            <div className="w-full bg-[#FCF3FF] border-y-6 p-5 mt-6 text-center border-white text-[#413D6C]">
              <h2 className="text-2xl font-bold">Tentang penyakit ini</h2>
            </div>
            <div className="w-full bg-cover bg-center bg-[#F6E6FC]">
              <div className="flex justify-center pt-12 pb-12">
                <CardsSection />
              </div>
            </div>
            <div className="w-full relative">
              <img
                src="/img/wave.png"
                alt="wave"
                className="w-full object-cover"
              />
            </div>

            <div className="mt-12 gap-12 grid grid-cols-1 mx-auto max-w-4xl p-4">
              <Content
                id="causes"
                title="Penyebab"
                items={diagnosisDetails.causes}
                bgColor="bg-[#F6E6FC]"
                titlePosition="justify-start title-left"
              />
              <Content
                id="symptoms"
                title="Gejala"
                items={diagnosisDetails.symptoms}
                bgColor="bg-[#EBCAF7]"
                textColor="text-[#413D6C]"
                borderColor="border-[#FAEEFF]"
                titlePosition="justify-end title-right"
              />
              <Content
                id="treatment"
                title="Treatment"
                items={diagnosisDetails.treatment}
                bgColor="bg-[#E0AEF5]"
                textColor="text-white"
                borderColor="border-[#FAEEFF]"
                titlePosition="justify-start title-left"
              />
              <Content
                id="reference"
                title="Referensi"
                items={diagnosisDetails.reference}
                bgColor="bg-[#D592F1]"
                textColor="text-white"
                borderColor="border-[#FAEEFF]"
                titlePosition="justify-end title-right"
              />
            </div>
          </>
        )}

        <div className="w-full max-w-4xl items-center mx-auto flex justify-center mb-4 mt-4">
          <button
            onClick={() => router.push("/")}
            className=" text-md cursor-pointer flex items-center bg-[#8B5CF6] max-w-fit shadow-xl shadow-purple-500/40 rounded-4xl mt-2 px-12 py-2 text-white hover:bg-[#7244dd] hover:-translate-y-1 transition-all duration-300"
          >
            Mulai Ulang
          </button>
        </div>
      </div>

      <footer className="w-full bg-transparent relative bottom-0">
        <img
          src="/img/footer.png"
          alt="footer background"
          className="w-full bg-transparent object-cover object-center"
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
