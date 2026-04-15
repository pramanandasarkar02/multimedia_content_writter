import Link from "next/link";

export default function ArticleCard({ article, showEdit = false }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <h2 className="text-2xl font-semibold">{article.title}</h2>

      <p className="text-gray-600 mt-2">
        {article.content.slice(0, 100)}...
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          href={`/articles/${article.id}`}
          className="text-blue-500 hover:underline"
        >
          Read Full Article
        </Link>

        {showEdit && (
          <Link
            href={`/articles/edit/${article.id}`}
            className="text-orange-500 hover:underline"
          >
            Edit Article
          </Link>
        )}
      </div>
    </div>
  );
}