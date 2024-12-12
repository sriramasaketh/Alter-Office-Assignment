import React, {useEffect} from 'react'
import PostCard from './PostCard'
import InfiniteScroll from './InfiniteScroll'
import {useFeed} from '../../context/FeedContext'

const Feed = () => {
  const {posts, fetchPosts, fetchMorePosts} = useFeed()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <InfiniteScroll onLoadMore={fetchMorePosts}>
      <div className='feed'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Feed
