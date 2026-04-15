import Navbar from "@/app/components/Navbar";
import ArticleForm from "@/app/components/ArticleForm";
import ArticleList from "@/app/components/ArticleList";
import { articles } from "@/app/data/articles";
import Link from "next/link";

export default function CreateArticlePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-6">
            Existing Articles
          </h2>

          <ArticleList
            articles={articles}
            showEdit={true}
          />
        </div>

        <div className="flex items-center justify-between mb-6 mt-12">
          <h1 className="text-4xl font-bold">Create a New Article</h1>

          <Link
            href="/articles/view"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            View Articles
          </Link>
        </div>

        <ArticleForm />

        
      </div>
    </div>
  );
}