import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { articles } from "@/app/data/articles";

export default async function SingleArticlePage({ params }) {
  const { id } = await params;

  const article = articles.find(
    (item) => item.id === Number(id)
  );

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
        <div className="bg-white p-8 rounded-2xl shadow">
          <Link
            href="/articles/view"
            className="text-blue-500 hover:underline"
          >
            ← Back to Articles
          </Link>

          <h1 className="text-4xl font-bold mt-6">{article.title}</h1>

          <div className="mt-8 text-gray-700 leading-8 text-lg whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}