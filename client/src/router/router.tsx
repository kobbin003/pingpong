import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Home from "../pages/home/Home";
import Conversations from "../components/conversations/Conversations";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/login",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/user",
		element: <Home />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "chat/:id",
				element: <Conversations />,
			},
		],
	},
]);
