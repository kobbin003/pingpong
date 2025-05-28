import { useSelector } from "react-redux";
import FriendsListItem from "../friendsListItem/FriendsListItem";
import { RootState } from "../../redux/store/store";
import { useGetRelationByStatusQuery } from "../../api/relations";

export const FriendsList = () => {
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { data, error, isLoading } = useGetRelationByStatusQuery({
		accessToken,
		status: "accepted",
	});
	console.log("relation by status-accepted", data, error, isLoading);

	return (
		<ul className="list-none">
			{data &&
				data.length > 0 &&
				data.map((item) => <FriendsListItem item={item} key={item._id} />)}
		</ul>
	);
};
