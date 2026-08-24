'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, content }),
    })

    if (!res.ok) {
      alert('오류가 발생했습니다')
      return
    }

    setNickname('')
    setContent('')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border rounded p-2"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded p-2 h-20"
        placeholder="댓글 내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        댓글 등록
      </button>
    </form>
  )
}