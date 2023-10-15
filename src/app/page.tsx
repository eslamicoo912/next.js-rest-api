"use client";
import Image from "next/image";
import { GET } from "./api/todos/route";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const fetchData = async () => {
    const res = await GET();
    const data = await res.json();
    setTodos(data.slice(190));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="bg-white p-3 rounded text-black">
        Here is my todo that are fetched
      </h1>
      {todos.map((todo, index) => {
        return (
          <div key={index}>
            <h1>{todo.title}</h1>
          </div>
        );
      })}
    </main>
  );
}
