"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { articles } from "@/app/data/articles";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();

  const articleId = Number(params.id);

  const article = articles.find(
    (item) => item.id === articleId
  );

  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedArticle = {
      id: articleId,
      title,
      content,
    };

    console.log("Updated Article:", updatedArticle);

    alert("Article updated successfully");

    router.push("/articles/view");
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Edit Article</h1>

          <Link
            href="/articles/create"
            className="text-blue-500 hover:underline"
          >
            Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow flex flex-col gap-4"
        >
          <div>
            <label className="block mb-2 font-medium">
              Article Title
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Article Content
            </label>
            <textarea
              className="w-full border rounded-lg px-4 py-3 min-h-[250px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
}