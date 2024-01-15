import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import ProductCard from '../../components/cards/product/productCard'
import { Grid } from '@mui/material'
import ProductSkeleton from '../../components/loaders/product/ProductSkeleton'

const drawerWidth = 300

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
	open?: boolean
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	})
}))

export default function MarketPage() {
	const { fetchProductCategories, fetchProducts, fetchMoreProducts, fetchProductsByCategory } = useActions()
	const { productCategories, products } = useTypedSelector(state => state.products)

	React.useEffect(() => {
		fetchProductCategories()
		fetchProducts()
	}, [])
	const [open, setOpen] = React.useState(false)

	const handleResize = () => {
		const screenWidthThreshold = 700
		const isVisible = window.innerWidth >= screenWidthThreshold
		setOpen(isVisible)
	}

	React.useEffect(() => {
		window.addEventListener('resize', handleResize)

		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const loadMore = () => {
		fetchMoreProducts(products.skip / products.limit + 1)
	}

	const [sentryRef] = useInfiniteScroll({
		loading: !products,
		hasNextPage: products.total > products.skip / products.limit,
		onLoadMore: loadMore
	})

	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						paddingTop: 8,
						overflow: 'hidden'
					}
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<Divider />
				<List sx={{ overflow: 'auto' }}>
					{productCategories.length &&
						productCategories.map((category, i) => (
							<ListItem key={category}>
								<ListItemButton onClick={e => fetchProductsByCategory(category)}>
									<ListItemIcon>{i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={category} />
								</ListItemButton>
							</ListItem>
						))}
				</List>
			</Drawer>
			<Main open={open}>
				<Grid spacing={2} container>
					{products.products.length &&
						products.products.map(e => (
							<Grid key={e.id} item xs={3}>
								<ProductCard item={e} />
							</Grid>
						))}
					{Array.from(new Array(3)).map((e, i) => (
						<Grid key={i} item xs={3}>
							<ProductSkeleton />
						</Grid>
					))}
				</Grid>
				<div ref={sentryRef} />
			</Main>
		</Box>
	)
}
