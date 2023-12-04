import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { UserChats } from "../pages/userChats/UserChats";
import { NotFound } from "../pages/notFound/NotFound";
import Auth from "../pages/auth/Auth";
import LoggedIn from "../components/LoggedIn";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/user/chat/:id",
		element: <UserChats />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "loggedin",
		element: <LoggedIn />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
