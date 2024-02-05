import { useSelector } from "react-redux";
import FriendsListItem from "../friendsListItem/FriendsListItem";
import { RootState } from "../../redux/store/store";
import { useGetRelationByStatusQuery } from "../../api/relations";

type Props = {};

export const FriendsList = ({}: Props) => {
	// TODO:
	// fetch: /friends/:status
	// -> show friend list: accepted,pending ,declined
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { data, error, isLoading } = useGetRelationByStatusQuery({
		accessToken,
		status: "accepted",
	});
	console.log("relation by status", data, error, isLoading);

	// TODO:
	// fetch: "/accept/:relationId" , "/decline/:relationId",
	// -> accept of decline friends.
	return (
		<ul className="list-none">
			{/* {[1, 2, 3, 4].map((item) => (
				<FriendsListItem item={item} key={item} />
			))} */}
			{data &&
				data.map((item) => <FriendsListItem item={item} key={item._id} />)}
		</ul>
	);
};
