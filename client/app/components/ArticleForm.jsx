"use client";

import { useState } from "react";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      content,
    };

    console.log("Saved Article:", newArticle);

    alert("Article saved successfully");

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow flex flex-col gap-4"
    >
      <div>
        <label className="block mb-2 font-medium">Article Title</label>
        <input
          type="text"
          placeholder="Enter article title"
          className="w-full border rounded-lg px-4 py-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Article Content</label>
        <textarea
          placeholder="Write your article here..."
          className="w-full border rounded-lg px-4 py-3 min-h-[250px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
      >
        Save Article
      </button>
    </form>
  );
}