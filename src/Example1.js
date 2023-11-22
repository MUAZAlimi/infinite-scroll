/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useCallback } from "react" 
import usePosts from "./hooks/usePosts"
import { confirmAlert } from "react-confirm-alert"
import  'react-confirm-alert/src/react-confirm-alert.css'

const Example1 = () => {
  const [pageNum, setPageNum] = useState(1)
  const { loading, isError, error, result, hasNextPage } = usePosts(pageNum)

  if (isError) return <p className="center"> Error : {error.message}</p>

  const lastPostRef = useRef();

  const content = result.map((post, i) => {
    if(result.length === i + 1) {

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
