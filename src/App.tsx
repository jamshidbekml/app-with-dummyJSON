import './App.css'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './pages/auth/Login'
import PrivateRoute from './components/layouts/PrivateRoute'
import NotFound from './pages/NotFound'
import MarketPage from './pages/market/Market'
import FriendsPage from './pages/friends/Friends'
import HomePage from './pages/home/Home'
import SingleUserPage from './pages/singleUser/SingleUser'

function App() {
	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Switch>
					<Route component={LoginPage} path="/login" />
					<PrivateRoute component={MarketPage} path="/market" />
					<PrivateRoute component={SingleUserPage} path="/friends/:id" />
					<PrivateRoute component={FriendsPage} path="/friends" />
					<PrivateRoute component={HomePage} path="/" exact />
					<PrivateRoute component={NotFound} />
				</Switch>
			</BrowserRouter>
			<ToastContainer position="bottom-right" theme="colored" />
		</ErrorBoundary>
	)
}

export default App
