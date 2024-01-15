import * as React from 'react'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
	tableCellClasses
} from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		fontSize: 16
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}))

function createData(todo: string, completed: boolean) {
	return { todo, completed }
}

interface UserPostListParams {
	id: string
}

const UserTodosList: React.FC<UserPostListParams> = ({ id }) => {
	const { fetchUserTodos } = useActions()
	const { userTodos } = useTypedSelector(state => state.users)

	React.useEffect(() => {
		fetchUserTodos(id)
	}, [id, fetchUserTodos])
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Todos</StyledTableCell>
						<StyledTableCell align="center">Completed</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{userTodos?.todos.length > 0 &&
						userTodos?.todos.map(row => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.todo}
								</StyledTableCell>
								<StyledTableCell align="center">{row.completed ? 'Completed' : 'Not Completed'}</StyledTableCell>
							</StyledTableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
		// <Grid sx={{ padding: 2 }}>
		// 	{userTodos?.todos.length > 0 &&
		// 		userTodos.todos.map(e => (
		// 			<Card key={e.id} sx={{ marginBottom: 2 }}>
		// 				<CardContent>
		// 					<Typography>{e.todo}</Typography>
		// 				</CardContent>
		// 			</Card>
		// 		))}
		// </Grid>
	)
}

export default UserTodosList
