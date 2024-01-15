import * as React from 'react'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import PostCard from '../cards/post/postCard'
import { Grid } from '@mui/material'

interface UserPostListParams {
	id: string
}

const UserPostsList: React.FC<UserPostListParams> = ({ id }) => {
	const { fetchUserPosts } = useActions()
	const { userPosts } = useTypedSelector(state => state.users)

	React.useEffect(() => {
		fetchUserPosts(id)
	}, [id, fetchUserPosts])
	return (
		<Grid sx={{ padding: 2 }}>
			{userPosts?.posts.length > 0 && userPosts.posts.map(e => <PostCard item={e} key={e.id} />)}
		</Grid>
	)
}

export default UserPostsList
