import * as React from 'react'
import { IProduct } from '../../../types'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

interface ProductCardProps {
	item: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 140 }} image={item.thumbnail} title="green iguana" />
			<CardContent>
				<Typography
					gutterBottom
					variant="h6"
					component="div"
					style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
				>
					{item.title}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					${item.price}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default ProductCard
