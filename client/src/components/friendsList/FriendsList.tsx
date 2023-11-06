import FriendsListItem from "../friendsListItem/FriendsListItem";

type Props = {};

export const FriendsList = ({}: Props) => {
	return (
		<ul className="list-none">
			{[1, 2, 3, 4].map((item) => (
				<FriendsListItem
					item={item}
					key={item}
				/>
			))}
		</ul>
	);
};
