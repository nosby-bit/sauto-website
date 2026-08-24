import { Pool } from 'pg'
import { NextResponse } from 'next/server'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  const result = await pool.query(
    'SELECT * FROM posts ORDER BY created_at DESC'
  )
  return NextResponse.json(result.rows)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { nickname, title, content } = body

  const result = await pool.query(
    'INSERT INTO posts (nickname, title, content) VALUES ($1, $2, $3) RETURNING *',
    [nickname, title, content]
  )

  return NextResponse.json(result.rows[0])
}