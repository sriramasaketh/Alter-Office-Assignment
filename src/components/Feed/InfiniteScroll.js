import React, {useRef, useEffect} from 'react'

const InfiniteScroll = ({onLoadMore, children}) => {
  const observerRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      {threshold: 1},
    )
    if (observerRef.current) observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [onLoadMore])

  return (
    <div>
      {children}
      <div ref={observerRef} style={{height: '1px'}} />
    </div>
  )
}

export default InfiniteScroll
