import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "./lib/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
	const nav = useNavigate();
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const [isAuthenticated, userHasAuthenticated] = useState(false);

	useEffect(() => {
		onLoad();
	}, []);

	async function handleLogout() {
		await Auth.signOut();

		userHasAuthenticated(false);
		nav("/login");
	}

	async function onLoad() {
		try {
			await Auth.currentSession();
			userHasAuthenticated(true);
		} catch (e) {
			if (e !== "No current user") {
				onError(e);
			}
		}

		setIsAuthenticating(false);
	}
	return (
		!isAuthenticating && (
			<div className='App container py-3'>
				<Navbar collapseOnSelect bg='light' expand='md' className='mb-3 px-3'>
					<LinkContainer to='/'>
						<Navbar.Brand className='fw-bold text-muted'>Scratch</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Nav activeKey={window.location.pathname}>
							{isAuthenticated ? (
								<>
									<LinkContainer to='/settings'>
										<Nav.Link>Settings</Nav.Link>
									</LinkContainer>
									<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
								</>
							) : (
								<>
									<LinkContainer to='/signup'>
										<Nav.Link>Signup</Nav.Link>
									</LinkContainer>
									<LinkContainer to='/login'>
										<Nav.Link>Login</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<ErrorBoundary>
					<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
						<Routes />
					</AppContext.Provider>
				</ErrorBoundary>
			</div>
		)
	);
}

export default App;