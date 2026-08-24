import Link from 'next/link'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function Home() {
  const result = await pool.query(
    'SELECT * FROM posts ORDER BY created_at DESC'
  )
  const posts = result.rows

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link href="/posts/new" className="bg-black text-white px-4 py-2 rounded">
          글쓰기
        </Link>
      </div>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 hover:bg-gray-50">
            <Link href={`/posts/${post.id}`}>
              <div className="font-semibold">{post.title}</div>
              <div className="text-sm text-gray-500">{post.nickname}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}