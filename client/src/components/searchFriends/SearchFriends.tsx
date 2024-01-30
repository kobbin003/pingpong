import SearchBar from "../searchBar/SearchBar";
import SearchFriendsLists from "./components/searchFriendsLists/SearchFriendsLists";

type Props = {};

const SearchFriends = ({}: Props) => {
	// TODO
	// "/request" -> send request.
	return (
		<div>
			<SearchBar />
			<SearchFriendsLists />
		</div>
	);
};

export default SearchFriends;
