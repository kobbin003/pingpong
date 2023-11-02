import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Home from "../pages/home/Home";
import Layout1 from "../pages/Layout1/Layout1";

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
				element: <Layout1 />,
			},
		],
	},
]);
