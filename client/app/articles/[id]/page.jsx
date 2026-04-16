import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { getArticleById } from "@/app/lib/getArticles";

export default async function SingleArticlePage({ params }) {
  const { id } = await params;

  const article = await getArticleById(id);

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

  <div className="min-h-screen flex justify-center px-4 py-10">
    <div className="w-full max-w-4xl">
      <div className="bg-white p-8 rounded-2xl shadow">
        <Link href="/articles/view" className="text-blue-500 hover:underline mb-5">
          ← Back to Articles
        </Link>
        <h1 className="text-red-600 text-md font-bold">
  if the link doesn't work, refresh browser ;)
</h1>
        <div
          className="mt-8 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  </div>
</div>
  );
}