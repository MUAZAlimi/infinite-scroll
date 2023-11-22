/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useCallback } from "react" 
import usePosts from "./hooks/usePosts"
import { confirmAlert } from "react-confirm-alert"
import  'react-confirm-alert/src/react-confirm-alert.css'
import Post from "./Post"

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1)
  const { loading, isError, error, result, hasNextPage } = usePosts(pageNum)

  
  const intObserver = useRef();
  
  const lastPostRef = useCallback((post) => {
    if(loading) return;

    if(intObserver.current) intObserver.current.disconnect();

    const confirmLoad = () => {
      confirmAlert({
        title: "Confirm Load More",
        message: "Are you sure to load more posts?",
        buttons:[
          {
            label: "Yes",
            onClick: () => {
               setPageNum((prev) => prev + 1)
            }
          },
          {label: "No"}
        ]
      })
    }

    intObserver.current = new IntersectionObserver((post) => {
      if (post[0].isIntersecting && hasNextPage){
        console.log("we are at the next post")
        confirmLoad()
      }
    })

    if(post) intObserver.current.observe(post)
  }, [loading, hasNextPage])

  if (isError) return <p className="center"> Error : {error.message}</p>

  const content = result.map((post, i) => {
    if(result.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post}/>
    }
    return <Post key={post.id} post={post}/>
  })

  return (
    <>
        <h1 id='top'>
            &infin; Infinite Quary &amp; Scroll
            <br/>
            &infin;  Ex. 1 - React Only
        </h1>

        {content}

        <p className='center'>
            Loading more post...
        </p>

        <p className='center'>
            <a href='#top'>Back to Top</a>
        </p>
    </>
  )
}

export default Example1
