export async function getArticles() {
  const endpoints = [
    "https://multimedia-app-4cw7.onrender.com/articles/article1",
    "https://multimedia-app-4cw7.onrender.com/articles/article2",
    "https://multimedia-app-4cw7.onrender.com/articles/article3",
  ];

  const res = await Promise.all(endpoints.map((url) => fetch(url)));
  const data = await Promise.all(res.map((r) => r.json()));

  return data.map((item) => ({
  id: item.id, // KEEP REAL ID
  title: item.id,
  content: item.content,
}));
}

export async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find((a) => a.id === id);
}