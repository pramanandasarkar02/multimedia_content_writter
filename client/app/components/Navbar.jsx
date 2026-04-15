import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Article Platform
      </Link>

      <div className="flex gap-4">
        <Link
          href="/articles/create"
          className="text-blue-500 hover:underline"
        >
          Writer Page
        </Link>

        <Link
          href="/articles/view"
          className="text-green-500 hover:underline"
        >
          Reader Page
        </Link>
      </div>
    </nav>
  );
}