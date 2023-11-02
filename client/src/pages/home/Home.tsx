import { Outlet } from "react-router-dom";
import FriendsList from "../../components/friendsList/FriendsList";

type Props = {};

const Home = ({}: Props) => {
	return (
		<div>
			<h1>Home</h1>
			<FriendsList />
			<Outlet />
		</div>
	);
};

export default Home;
