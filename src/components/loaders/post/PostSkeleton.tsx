import React from 'react'
import { Card, CardContent, CardActions, Typography, Skeleton } from '@mui/material'

const PostSkeleton = () => {
	return (
		<Card sx={{ maxWidth: 540, marginBottom: 3 }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					<Skeleton animation="wave" height={24} width="80%" />
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<Skeleton animation="wave" height={15} />
					<Skeleton animation="wave" height={15} />
					<Skeleton animation="wave" height={15} />
				</Typography>
			</CardContent>
			<CardActions>
				<Skeleton animation="wave" height={20} width="50%" />
				<Skeleton animation="wave" height={20} width="20%" sx={{ marginLeft: 'auto' }} />
			</CardActions>
		</Card>
	)
}

export default PostSkeleton
