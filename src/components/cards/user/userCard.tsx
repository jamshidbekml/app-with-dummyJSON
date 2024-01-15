import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { IUser } from '../../../types'

interface UserCardProps {
	user: IUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
	return (
		<Card>
			<CardHeader
				avatar={<Avatar alt={user.firstName + 'image'} src={user.image} />}
				title={`${user.firstName} ${user.lastName}`}
				subheader={user.birthDate}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Address: {user.address.city}, {user.address.address}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Phone: {user.phone}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Email: {user.email}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default UserCard
