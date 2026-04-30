"use client";

import { useEffect, useState } from "react";

export default function QA() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:5000/questions");
    const data = await res.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const askQuestion = async () => {
    if (!text) return;

    await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchQuestions();
  };

  const addAnswer = async (id: number) => {
    if (!answers[id]) return;

    await fetch("http://localhost:5000/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        answer: answers[id],
      }),
    });

    setAnswers({ ...answers, [id]: "" });
    fetchQuestions();
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">💬 Q&A</h1>

      {/* Ask */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question..."
        className="p-3 w-full bg-gray-800 border border-gray-600 rounded"
      />

      <button
        onClick={askQuestion}
        className="mt-3 bg-blue-600 px-4 py-2 rounded"
      >
        Ask
      </button>

      {/* List */}
      <div className="mt-8 space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="bg-gray-900 p-5 rounded">

            <h2 className="mb-3">{q.text}</h2>

            {/* Answers */}
            {q.answers.map((a: string, i: number) => (
              <p key={i} className="text-gray-400">👉 {a}</p>
            ))}

            {/* Answer input */}
            <input
              value={answers[q.id] || ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
              placeholder="Write answer..."
              className="mt-3 p-2 w-full bg-gray-800"
            />

            <button
              onClick={() => addAnswer(q.id)}
              className="mt-2 bg-green-600 px-3 py-1 rounded"
            >
              Answer
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}