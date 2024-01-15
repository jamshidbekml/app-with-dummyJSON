import { Container, Grid } from '@mui/material'
import * as React from 'react'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import UserCard from '../../components/cards/user/userCard'
import { Link } from 'react-router-dom'
import UserCardSkeleton from '../../components/loaders/user/UserSkeleton'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const FriendsPage = () => {
	const { fetchUsers, fetchMoreUsers } = useActions()
	const { users, usersLoading } = useTypedSelector(state => state.users)

	React.useEffect(() => {
		fetchUsers()
	}, [])

	const loadMore = () => {
		fetchMoreUsers(users.skip / users.limit + 1)
	}

	const [sentryRef] = useInfiniteScroll({
		loading: !users,
		hasNextPage: users.total > users.skip / users.limit,
		onLoadMore: loadMore
	})
	return (
		<>
			<Container maxWidth="sm">
				<Grid container spacing={2}>
					{!usersLoading
						? users.users.length &&
							users.users.map(e => (
								<Grid item key={e.id} xs={12}>
									<Link to={`/friends/${e.id}`} style={{ textDecoration: 'none' }}>
										<UserCard user={e} />
									</Link>
								</Grid>
							))
						: Array.from(new Array(3)).map((e, i) => (
								<Grid item key={i} xs={12}>
									<UserCardSkeleton />
								</Grid>
							))}
					{Array.from(new Array(2)).map((e, i) => (
						<Grid item key={i} xs={12}>
							<UserCardSkeleton />
						</Grid>
					))}
					<div ref={sentryRef}></div>
				</Grid>
			</Container>
		</>
	)
}

export default FriendsPage
