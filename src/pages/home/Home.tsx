import { Box, Container, SpeedDial, SpeedDialIcon } from '@mui/material'
import * as React from 'react'
import PostCard from '../../components/cards/post/postCard'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PostSkeleton from '../../components/loaders/post/PostSkeleton'

const HomePage = () => {
	const { fetchPosts, fetchMorePosts } = useActions()
	const { posts, postsLoading } = useTypedSelector(state => state.posts)

	const loadMore = () => {
		fetchMorePosts(posts.skip / posts.limit + 1)
	}

	const [sentryRef] = useInfiniteScroll({
		loading: !posts,
		hasNextPage: posts.total > posts.skip / posts.limit,
		onLoadMore: loadMore
	})

	React.useEffect(() => {
		fetchPosts()
	}, [])
	return (
		<Container maxWidth={'sm'}>
			<Box>
				{postsLoading
					? Array.from(new Array(3)).map((e, i) => <PostSkeleton key={i} />)
					: posts.posts.map((e, i) => <PostCard item={e} key={i} />)}
				{Array.from(new Array(2)).map((e, i) => (
					<PostSkeleton key={i} />
				))}
				<div ref={sentryRef} />
			</Box>
		</Container>
	)
}

export default HomePage
