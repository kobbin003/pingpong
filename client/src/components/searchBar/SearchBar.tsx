import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./searchBar.css";
type Props = {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};
const SearchBar = ({ setSearchQuery: setSearch }: Props) => {
	const [clearButtonVisibility, setClearButtonVisibility] = useState<
		"visible" | "hidden"
	>("hidden");
	const [searchQuery, setSearchQuery] = useState("");
	const searchInput = useRef<HTMLInputElement>(null);
	// const [containerBackgroundColor, setContainerBackgroundColor] =
	// 	useState("#eeeeee");
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);

		// start showing reset button after inital input.
		if (clearButtonVisibility == "hidden") {
			setClearButtonVisibility("visible");
		}
		// stop showing reset button when input is empty.
		if (e.target.value == "") {
			setClearButtonVisibility("hidden");
		}
	};
	const handleReset = () => {
		setSearchQuery("");
		setClearButtonVisibility("hidden");
		// keep focus on input even after resetting
		if (searchInput.current) {
			searchInput.current.focus();
		}
	};

	// DEBOUNCING:
	useEffect(() => {
		setSearch(searchQuery); // no need of debouncing since we fetching with click
		// const timeout = setTimeout(() => {
		// 	// setSearch(searchQuery);
		// }, 500);
		// return () => clearTimeout(timeout);
	}, [searchQuery]);
	return (
		<div
			id="searchbar__container"
			// style={{ backgroundColor: `${containerBackgroundColor}` }}
		>
			{/* <img src="/src/assets/search.svg" height={20} width={20} /> */}
			<input
				id="searchbar"
				type="search"
				ref={searchInput}
				placeholder="Search friend by email"
				onChange={handleOnChange}
				onFocus={() => {
					// setContainerBackgroundColor("#eeeeee");
					// setContainerBackgroundColor("transparent");
				}}
				onBlur={() => {
					// setContainerBackgroundColor("#eeeeee");
				}}
				value={searchQuery}
			/>
			<button onClick={handleReset}>
				<img
					src="/src/assets/closeSearch.svg"
					height={20}
					width={20}
					style={{ visibility: `${clearButtonVisibility}` }}
				/>
			</button>
		</div>
	);
};

export default SearchBar;
