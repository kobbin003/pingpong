import SearchFriendsListItem from "../searchFriendsListItem/SearchFriendsListItem";

type Props = {};

const SearchFriendsLists = ({}: Props) => {
	return (
		<div>
			<ul>
				<SearchFriendsListItem />
				<SearchFriendsListItem />
				<SearchFriendsListItem />
			</ul>
		</div>
	);
};

export default SearchFriendsLists;
