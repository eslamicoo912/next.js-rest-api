import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY as string;
const URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  const res = await fetch(URL);
  const todos: Todo[] = await res.json();
  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id)
    return NextResponse.json({
      message: "id not found",
    });

  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      API_KEY: API_KEY,
    },
  });

  return NextResponse.json({
    message: `todo ${id} deleted`,
  });
}

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();
  if (!userId || !title) {
    return NextResponse.json({
      message: `missing required data`,
    });
  }

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      API_KEY: API_KEY,
      body: JSON.stringify({
        userId,
        title,
        completed: false,
      }),
    },
  });
  const newTodo: Todo = await res.json();
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json();
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      API_KEY: API_KEY,
    },
    body: JSON.stringify({ userId, title, completed }),
  });

  const updatedTodo = await res.json();
  return NextResponse.json(updatedTodo);
}
