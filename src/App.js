import React, { lazy, Suspense } from 'react';
import Header from './component/layout/header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const UsersForm = lazy(() => import('./component/user/AddUser'));
const UserSearch = lazy(() => import('./component/user/UserSearch'));
function App() {
	return (
		<Router>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route exact path="/">
						<UsersForm />
					</Route>
					<Route  path="/user-detail">
						<UserSearch />
					</Route>
				</Switch>
			</Suspense>

		</Router>
	);
}

export default App;
