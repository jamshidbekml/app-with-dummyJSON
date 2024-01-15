import * as React from 'react'
import { Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, NavLink, Switch, Route, useParams } from 'react-router-dom'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import UserCard from '../../components/cards/user/userCard'
import UserPostsList from '../../components/userPostsList/UserPostsList'
import UserTodosList from '../../components/userTodosList/UserTodosList'

const SingleUserPage = () => {
	const params: { id: string } = useParams()

	const { fetchSingleUser } = useActions()
	const { singleUser, singleUserLoading } = useTypedSelector(state => state.users)

	React.useEffect(() => {
		fetchSingleUser(+params.id)
	}, [params.id, fetchSingleUser])

	return (
		<Container maxWidth="md">
			<Paper>
				<Link to={'/friends'}>
					<IconButton>
						<ArrowBackIcon fontSize="medium" />
					</IconButton>
				</Link>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
					<NavLink
						to={`/friends/${params.id}`}
						className="header-nav_link"
						activeClassName="header-nav_link-active"
						exact
					>
						<Typography>User</Typography>
					</NavLink>
					<NavLink
						to={`/friends/${params.id}/posts`}
						className="header-nav_link"
						activeClassName="header-nav_link-active"
					>
						<Typography>Posts</Typography>
					</NavLink>
					<NavLink
						to={`/friends/${params.id}/todos`}
						className="header-nav_link"
						activeClassName="header-nav_link-active"
					>
						<Typography>Todos</Typography>
					</NavLink>
				</Toolbar>
				<Switch>
					<Route path={'/friends/:id'} exact>
						{!singleUserLoading && singleUser && <UserCard user={singleUser} />}
					</Route>
					<Route path={'/friends/:id/posts'}>
						<UserPostsList id={params.id} />
					</Route>
					<Route path={'/friends/:id/todos'}>
						<UserTodosList id={params.id} />
					</Route>
				</Switch>
			</Paper>
		</Container>
	)
}

export default SingleUserPage
