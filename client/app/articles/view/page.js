import Navbar from "@/app/components/Navbar";
import ArticleList from "@/app/components/ArticleList";
import { getArticles } from "@/app/lib/getArticles";

export default async function ViewArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Saved Articles</h1>

        <ArticleList articles={articles} />
      </div>
    </div>
  );
}