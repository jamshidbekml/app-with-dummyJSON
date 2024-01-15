import * as React from 'react'
import { Component, ErrorInfo, PropsWithChildren } from 'react'
import ErrorAlert from './ErrorAlert'

interface IErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren, IErrorBoundaryState> {
	constructor(props: PropsWithChildren) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	componentDidCatch(error: Error, _: ErrorInfo) {
		this.setState({ hasError: true })
	}

	render() {
		const { hasError } = this.state
		const { children } = this.props
		if (hasError) return <ErrorAlert />
		return <>{children}</>
	}
}

export default ErrorBoundary
