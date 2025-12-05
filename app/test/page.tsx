"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

type NodeData = QuestionNode | DiagnosisNode | null;

export default function Test() {
  const [currentNode, setCurrentNode] = useState("root");
  const [nodeData, setNodeData] = useState<NodeData>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNode = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/question/${currentNode}`
        );
        const data: NodeData = await res.json();
        setNodeData(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchNode();
  }, [currentNode]);

  useEffect(() => {
    if (nodeData?.type === "diagnosis") {
      console.log("Node Data", nodeData);
      sessionStorage.setItem("lastNode", JSON.stringify(nodeData));
      router.push(`/result?disease_name=${nodeData.disease_name}`);
    }
  }, [nodeData]);

  const handleAnswer = (next: string) => {
    setCurrentNode(next);
    setNumberOfQuestions((prev) => prev + 1);
  };

  if (!nodeData) {
    return (
      <p className="text-white text-2xl font-bold animate-pulse">Loading...</p>
    );
  }

  if (nodeData.type === "diagnosis") {
    return (
      <p className="text-white text-2xl font-bold animate-pulse">Loading...</p>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-min max-w-xl p-4 bg-[#F6E6FC] rounded-4xl shadow-xl relative mb-6 shadow-purple-500/20">
        <div className="z-10 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white w-16 h-16 rounded-full shadow-lg shadow-purple-700/15 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-purple-700">
            {numberOfQuestions + 1}
          </h2>
        </div>

        <div className="w-full max-w-xl bg-white relative p-8 rounded-4xl shadow-lg shadow-purple-500/15 text-center">
          {nodeData.type === "question" && (
            <>
              <h1 className="text-2xl text-[#413D6C] font-bold mb-4">
                {nodeData.text}
              </h1>

              {nodeData.image_desc && (
                <p className="text-[#413D6C]/80 text-sm italic mb-3">
                  {nodeData.image_desc}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* OPTIONS */}
      {nodeData.type === "question" && (
        <div className="grid grid-cols-2 gap-4 mt-2 w-full max-w-xl">
          {nodeData.options.map((opt, idx) => (
            <div
              key={idx}
              className={idx === 2 ? "col-span-2 flex justify-center" : ""}
            >
              <button
                onClick={() => handleAnswer(opt.next)}
                className={
                  idx === 2
                    ? "bg-white border-6 border-[#F6E6FC] hover:bg-[#F6E6FC] hover:border-white text-[#413D6C] p-8 font-semibold py-3 rounded-4xl shadow-lg transition-all hover:-translate-y-1"
                    : "w-full h-full bg-white border-6 border-[#F6E6FC] hover:bg-[#F6E6FC] hover:border-white text-[#413D6C] p-8 font-semibold py-3 rounded-4xl shadow-lg transition-all hover:-translate-y-1"
                }
              >
                {opt.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
