import ArticleCard from "./ArticleCard";

export default function ArticleList({
  articles,
  showEdit = false,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          showEdit={showEdit}
        />
      ))}
    </div>
  );
}