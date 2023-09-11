import { Post } from '@prisma/client'
import React from 'react'

export function PostCard(props: {post: Post, index: number}) {
    const {post, index} = props;
  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
    </div>
  )
}

export default PostCard