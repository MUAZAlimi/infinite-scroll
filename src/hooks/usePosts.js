import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios";

const usePosts = (pageNum = 1) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [isError, setIsError] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
      setLoading(true)
      setIsError(false)
      setError([])

      const controller = new AbortController();
      const { signal } = controller

      getPostsPage(pageNum, { signal })
      .then(data => {
        setResult(prev => [...prev, ...data])
        setHasNextPage(Boolean(data.length))
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        if(signal.aborted) return
        setIsError(true)
        setError({ message: e.message})
      })
      return () => controller.abort()
    }, [pageNum])
    

    return {loading, isError, error, result, hasNextPage}
}

export default usePosts
