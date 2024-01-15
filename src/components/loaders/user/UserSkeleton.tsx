import React from 'react'
import { Card, CardHeader, Avatar, CardContent, Typography, Skeleton } from '@mui/material'

const UserCardSkeleton = () => {
	return (
		<Card>
			<CardHeader
				avatar={<Skeleton variant="circular" width={40} height={40} />}
				title={<Skeleton animation="wave" height={20} width="80%" />}
				subheader={<Skeleton animation="wave" height={16} width="40%" />}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					<Skeleton animation="wave" height={16} width="80%" />
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<Skeleton animation="wave" height={16} width="60%" />
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<Skeleton animation="wave" height={16} width="50%" />
				</Typography>
			</CardContent>
		</Card>
	)
}

export default UserCardSkeleton
