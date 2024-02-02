import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { UserChats } from "../pages/userChats/UserChats";
import { NotFound } from "../pages/notFound/NotFound";
import Auth from "../pages/auth/Auth";
import LogIn from "../components/LogIn";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/user/chat/:id",
		element: (
			<PrivateRoute>
				<UserChats />
			</PrivateRoute>
		),
		errorElement: <ErrorBoundary />,
	},
	{
		path: "logIn",
		element: <LogIn />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
