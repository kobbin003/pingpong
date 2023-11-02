import { Outlet } from "react-router-dom";

type Props = {};

const Home = ({}: Props) => {
	return (
		<div
			data-theme="cupcake"
			className="h-screen"
		>
			<h1 className="">Home</h1>
			<Outlet />
		</div>
	);
};

export default Home;
