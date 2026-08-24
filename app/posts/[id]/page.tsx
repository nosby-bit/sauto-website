import { Pool } from 'pg'
import CommentForm from './CommentForm'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const postResult = await pool.query('SELECT * FROM posts WHERE id = $1', [id])
  const post = postResult.rows[0]

  const commentsResult = await pool.query(
    'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
    [id]
  )
  const comments = commentsResult.rows

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <div className="text-sm text-gray-500 mb-4">{post?.nickname}</div>
      <p className="mb-8 whitespace-pre-wrap">{post?.content}</p>

      <h2 className="font-semibold mb-3">댓글 {comments.length}개</h2>
      <ul className="space-y-2 mb-6">
        {comments.map((c) => (
          <li key={c.id} className="border rounded p-3">
            <div className="text-sm font-medium">{c.nickname}</div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>

      <CommentForm postId={id} />
    </main>
  )
}