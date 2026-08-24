import { Pool } from 'pg'
import { NextResponse } from 'next/server'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const result = await pool.query(
    'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC',
    [id]
  )
  return NextResponse.json(result.rows)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const { nickname, content } = body

  const result = await pool.query(
    'INSERT INTO comments (post_id, nickname, content) VALUES ($1, $2, $3) RETURNING *',
    [id, nickname, content]
  )

  return NextResponse.json(result.rows[0])
}