import { NextResponse } from "next/server";

const URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const res = await fetch(`${URL}/${id}`);
  const todo: Todo = await res.json();
  return NextResponse.json(todo);
}
