"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { getArticles } from "@/app/lib/getArticles";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();

  const articleId = Number(params.id);

  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      const articles = await getArticles();
      const found = articles.find((a) => a.id === articleId);

      setArticle(found);
      setTitle(found?.title || "");
      setContent(found?.content || "");
    }

    load();
  }, [articleId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      id: articleId,
      title,
      content,
    });

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

          <Link href="/articles/create" className="text-blue-500 hover:underline">
            Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow flex flex-col gap-4"
        >
          <input
            className="border px-4 py-3 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border px-4 py-3 rounded-lg min-h-[250px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="bg-orange-500 text-white py-3 rounded-lg"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
}