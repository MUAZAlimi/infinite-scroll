import React from 'react'

const Post = React.forwardRef(({post}) => {
    const postBody = (
        <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Post ID : {post.id}</p>
        </>
    )

    const content = ref ?
                        <article ref={ref}>{postBodt}</article>
                        :
                        <article>{postBody}</article>

                        return content
  return (
    <div> Post </div>
  )
})

export default Post
