import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import useTypedSelector from '../../hooks/useTypedSelector'
import Header from '../header/Header'

interface PrivateRouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined
	path?: string
	exact?: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, path = '/', exact = false }) => {
	const { token } = useTypedSelector((state): any => state.auth)

	if (!token) return <Redirect to={`/login?redirectTo=/`} />
	return (
		<>
			<Header />
			<Route component={component} path={path} exact={exact} />
		</>
	)
}

export default PrivateRoute
