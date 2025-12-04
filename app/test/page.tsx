"use client";
import { useState, useEffect } from "react";

interface Option {
  label: string;
  next: string;
}

interface QuestionNode {
  type: "question";
  text: string;
  options: Option[];
  image_desc?: string;
}

interface DiagnosisNode {
  type: "diagnosis";
  disease_name: string;
  message: string;
}

interface DiagnosisDetail {
  causes: string[];
  symptoms: string[];
  treatment: string[];
}

type NodeData = QuestionNode | DiagnosisNode | null;

export default function Test() {
  const [currentNode, setCurrentNode] = useState("root");
  const [nodeData, setNodeData] = useState<NodeData>(null);
  const [diagnosisDetails, setDiagnosisDetails] =
    useState<DiagnosisDetail | null>(null);

  useEffect(() => {
    const fetchNode = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/question/${currentNode}`
        );
        const data: NodeData = await res.json();
        setNodeData(data);

        // Jika diagnosis, fetch detail diagnosis
        if (data && data.type === "diagnosis") {
          const dres = await fetch(
            `http://localhost:8000/diagnosis_details/${data.disease_name}`
          );
          const djson: DiagnosisDetail = await dres.json();
          setDiagnosisDetails(djson);
        } else {
          setDiagnosisDetails(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchNode();
  }, [currentNode]);

  const handleAnswer = (next: string) => {
    setCurrentNode(next);
  };

  if (!nodeData) {
    return <p className="text-white text-lg animate-pulse">Loading...</p>;
  }

  return (
    <div className="w-full max-w-xl p-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-3xl shadow-xl">
      <div className="w-full max-w-xl bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30 text-center">
        {/* QUESTION VIEW */}
        {nodeData.type === "question" && (
          <>
            <h1 className="text-2xl text-white font-bold mb-4">
              {nodeData.text}
            </h1>

            {nodeData.image_desc && (
              <p className="text-white/80 text-sm italic mb-3">
                {nodeData.image_desc}
              </p>
            )}

            <div className="flex flex-col gap-4 mt-6">
              {nodeData.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.next)}
                  className="bg-purple-600/90 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all hover:-translate-y-1"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* DIAGNOSIS VIEW */}
        {nodeData.type === "diagnosis" && (
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold">
              Diagnosis: {nodeData.disease_name}
            </h1>
            <p className="mt-4 text-lg">{nodeData.message}</p>

            {diagnosisDetails && (
              <div className="mt-6 text-black text-left bg-white/20 p-5 rounded-2xl backdrop-blur-lg">
                <h3 className="text-xl font-semibold mb-2">Penyebab:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {diagnosisDetails.causes.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-2">Gejala:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {diagnosisDetails.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mb-2">Pengobatan:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {diagnosisDetails.treatment.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setCurrentNode("root")}
              className="mt-8 bg-white text-purple-600 font-bold px-6 py-2 rounded-xl shadow hover:bg-gray-100 transition-all"
            >
              Mulai Ulang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
