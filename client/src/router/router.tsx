import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { NotFound } from "../pages/notFound/NotFound";
import Auth from "../pages/auth/Auth";
import { Suspense, lazy } from "react";

const LogIn = lazy(() => import("../components/LogIn"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Home = lazy(() => import("../pages/home/Home"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "/user/chat/:id",
		element: (
			<Suspense fallback={<>Loading...</>}>
				<PrivateRoute>
					<Home />
				</PrivateRoute>
			</Suspense>
		),
		errorElement: <ErrorBoundary />,
	},
	{
		path: "logIn",
		element: (
			<Suspense fallback={<>Loading...</>}>
				<LogIn />
			</Suspense>
		),
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
