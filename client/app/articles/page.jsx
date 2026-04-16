import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import AddArticleForm from "../components/ArticleForm";
import { getArticles } from "@/app/lib/getArticles";




export default async function ArticlesPage({ searchParams }) {
  const role = searchParams.role || "reader";

  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={role} />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Articles</h1>

        <div className="grid gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {role === "writer" && <AddArticleForm />}
      </div>
    </div>
  );
}