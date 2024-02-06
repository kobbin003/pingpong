import { useState } from "react";
import SearchFriendsLists from "./components/searchFriendsLists/SearchFriendsLists";
import SearchBar from "../searchBar/SearchBar";

type Props = {};

const SearchFriends = ({}: Props) => {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div>
			<SearchBar setSearchQuery={setSearchQuery} />
			<SearchFriendsLists searchQuery={searchQuery} />
		</div>
	);
};

export default SearchFriends;
