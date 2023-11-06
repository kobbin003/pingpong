import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import "./searchBar.css";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
	const [clearButtonVisibility, setClearButtonVisibility] = useState<
		"visible" | "hidden"
	>("hidden");
	const [searchValue, setSearchValue] = useState("");
	const searchInput = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const [containerBackgroundColor, setContainerBackgroundColor] =
		useState("#eeeeee");
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);

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
		setSearchValue("");
		setClearButtonVisibility("hidden");
		// keep focus on input even after resetting
		if (searchInput.current) {
			searchInput.current.focus();
		}
	};

	const handleKeyEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			navigate(`/search/${searchValue}/photos`);
		}
	};
	// DEBOUNCING:
	useEffect(() => {
		const timeout = setTimeout(() => {
			// setSearchValue(searchValue);
		}, 500);
		return () => clearTimeout(timeout);
	}, [searchValue]);
	return (
		<div
			id="searchbar__container"
			style={{ backgroundColor: `${containerBackgroundColor}` }}
		>
			<img
				src="/src/assets/search.svg"
				height={20}
				width={20}
			/>
			<input
				id="searchbar"
				type="search"
				ref={searchInput}
				placeholder="Search friend by email"
				onChange={handleOnChange}
				onFocus={() => {
					setContainerBackgroundColor("transparent");
				}}
				onBlur={() => {
					setContainerBackgroundColor("#eeeeee");
				}}
				onKeyDown={handleKeyEnterDown}
				value={searchValue}
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
