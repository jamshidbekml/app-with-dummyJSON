import React from 'react'
import { Card, CardContent, Typography, Skeleton } from '@mui/material'

const ProductSkeleton = () => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<Skeleton variant="rectangular" animation="wave" sx={{ height: 140 }} />
			<CardContent>
				<Typography gutterBottom variant="h6" component="div">
					<Skeleton animation="wave" height={30} width="80%" />
				</Typography>
				<Typography variant="body1" color="text.secondary">
					<Skeleton animation="wave" height={25} width="30%" />
				</Typography>
			</CardContent>
		</Card>
	)
}

export default ProductSkeleton
