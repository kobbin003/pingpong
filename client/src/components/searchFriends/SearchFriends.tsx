import SearchBar from "../searchBar/SearchBar";
import SearchFriendsLists from "./components/searchFriendsLists/SearchFriendsLists";

type Props = {};

const SearchFriends = ({}: Props) => {
	return (
		<div>
			<SearchBar />
			<SearchFriendsLists />
		</div>
	);
};

export default SearchFriends;
