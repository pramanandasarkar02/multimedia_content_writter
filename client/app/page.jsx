import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col gap-4 w-[350px]">
        <h1 className="text-3xl font-bold text-center">Article Platform</h1>

        <Link
          href="/articles/create"
          className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600"
        >
          Login as Writer
        </Link>

        <Link
          href="/articles/view"
          className="bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600"
        >
          Login as Reader
        </Link>
      </div>
    </div>
  );
}