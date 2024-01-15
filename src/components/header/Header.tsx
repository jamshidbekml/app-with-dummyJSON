import { styled } from '@mui/material/styles'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { Link, NavLink } from 'react-router-dom'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: 20,
	backgroundColor: '#f0f2f5',
	marginLeft: 0,
	width: '70%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: '70%'
	}
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: '#050505',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '24ch'
			}
		}
	}
}))

export default function Header() {
	const [isElementVisible, setElementVisibility] = useState(true)

	const handleResize = () => {
		const screenWidthThreshold = 700
		const isVisible = window.innerWidth >= screenWidthThreshold
		setElementVisibility(isVisible)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return (
		<Box sx={{ flexGrow: 1, marginBottom: 10 }}>
			<AppBar
				position="fixed"
				color="inherit"
				style={{ boxShadow: 'none' }}
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Grid container>
						{isElementVisible && (
							<Grid xs={4} item>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
								</Search>
							</Grid>
						)}
						<Grid
							xs={isElementVisible ? 4 : 8}
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center'
							}}
							item
						>
							<NavLink to={'/'} className="header-nav_link" activeClassName="header-nav_link-active" exact>
								<Typography>Home</Typography>
							</NavLink>
							<NavLink to={'/friends'} className="header-nav_link" activeClassName="header-nav_link-active">
								<Typography>Friends</Typography>
							</NavLink>
							<NavLink to={'/market'} className="header-nav_link" activeClassName="header-nav_link-active">
								<Typography>Market</Typography>
							</NavLink>
						</Grid>
						<Grid
							xs={4}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end'
							}}
							item
						>
							<Tooltip title="Profile Settings">
								<Link to={'/profile'}>
									<IconButton sx={{ p: 0 }}>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
									</IconButton>
								</Link>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
