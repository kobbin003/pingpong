import FriendsListItem from "../friendsListItem/FriendsListItem";

type Props = {};

export const FriendsList = ({}: Props) => {
	// TODO:
	// fetch: /friends/:status
	// -> show friend list: accepted,pending ,declined

	// TODO:
	// fetch: "/accept/:relationId" , "/decline/:relationId",
	// -> accept of decline friends.
	return (
		<ul className="list-none">
			{[1, 2, 3, 4].map((item) => (
				<FriendsListItem item={item} key={item} />
			))}
		</ul>
	);
};
