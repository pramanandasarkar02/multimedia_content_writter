import Navbar from "@/app/components/Navbar";
import ArticleForm from "@/app/components/ArticleForm";
import ArticleList from "@/app/components/ArticleList";
import Link from "next/link";
import { getArticles } from "@/app/lib/getArticles";

export default async function CreateArticlePage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Create Article <span className="text-red-500"> This feature don't work yet</span></h1>
          
          <Link
            href="/articles/view"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            View Articles
          </Link>
        </div>
      
        <p className="text-red-500">
          Idea: user input is transformed into a structured XML format based on a predefined layout schema. 
          The backend processes this XML and converts it into HTML with required features and styling logic, 
          then returns the final HTML to the frontend for rendering in the UI.
        </p>
        <ArticleForm />
        
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Existing Articles</h2>

          <ArticleList articles={articles} showEdit={true} />
        </div>
      </div>
    </div>
  );
}