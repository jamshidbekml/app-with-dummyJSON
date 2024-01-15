import * as React from 'react'
import { IPost } from '../../../types'
import { Card, CardActions, CardContent, Typography } from '@mui/material'

interface PostCardProps {
	item: IPost
}

const PostCard: React.FC<PostCardProps> = ({ item }) => {
	return (
		<Card sx={{ marginBottom: 3 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{item.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.body}
				</Typography>
			</CardContent>
			<CardActions>
				{item.tags.length &&
					item.tags.map(tag => (
						<Typography key={tag} color="blue">
							#{tag}
						</Typography>
					))}
				<Typography>| {item.reactions} Comments</Typography>
			</CardActions>
		</Card>
	)
}

export default PostCard
