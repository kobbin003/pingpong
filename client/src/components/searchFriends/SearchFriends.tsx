import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import SearchFriendsLists from "./components/searchFriendsLists/SearchFriendsLists";

const SearchFriends = () => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<SearchFriendsLists searchQuery={searchQuery} />
		</>
	);
};

export default SearchFriends;
