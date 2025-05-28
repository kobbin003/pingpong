import { Search } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import "./searchBar.css";

type Props = {
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	searchQuery: string;
};

const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
	const [clearButtonVisibility, setClearButtonVisibility] = useState<
		"visible" | "hidden"
	>("hidden");

	const searchInput = useRef<HTMLInputElement>(null);

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
	// const handleReset = () => {
	// 	setSearchQuery("");
	// 	setClearButtonVisibility("hidden");
	// 	// keep focus on input even after resetting
	// 	if (searchInput.current) {
	// 		searchInput.current.focus();
	// 	}
	// };

	return (
		<div className="space-y-4">
			<div className="relative">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
				<Input
					type="search"
					placeholder="Search by email..."
					className="pl-8"
					// id="searchbar"
					ref={searchInput}
					onChange={handleOnChange}
					value={searchQuery}
				/>
			</div>
			{/* <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
				Search for users by email to connect
			</div> */}
		</div>
	);
};

// const SearchBar = ({ setSearchQuery: setSearch }: Props) => {
// 	const [clearButtonVisibility, setClearButtonVisibility] = useState<
// 		"visible" | "hidden"
// 	>("hidden");
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const searchInput = useRef<HTMLInputElement>(null);
// 	// const [containerBackgroundColor, setContainerBackgroundColor] =
// 	// 	useState("#eeeeee");
// 	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		setSearchQuery(e.target.value);

// 		// start showing reset button after inital input.
// 		if (clearButtonVisibility == "hidden") {
// 			setClearButtonVisibility("visible");
// 		}
// 		// stop showing reset button when input is empty.
// 		if (e.target.value == "") {
// 			setClearButtonVisibility("hidden");
// 		}
// 	};
// 	const handleReset = () => {
// 		setSearchQuery("");
// 		setClearButtonVisibility("hidden");
// 		// keep focus on input even after resetting
// 		if (searchInput.current) {
// 			searchInput.current.focus();
// 		}
// 	};

// 	// DEBOUNCING:
// 	useEffect(() => {
// 		setSearch(searchQuery); // no need of debouncing since we fetching with click
// 		// const timeout = setTimeout(() => {
// 		// 	// setSearch(searchQuery);
// 		// }, 500);
// 		// return () => clearTimeout(timeout);
// 	}, [searchQuery]);
// 	return (
// 		<div
// 			id="searchbar__container"
// 			// style={{ backgroundColor: `${containerBackgroundColor}` }}
// 		>
// 			{/* <img src="/src/assets/search.svg" height={20} width={20} /> */}
// 			<input
// 				id="searchbar"
// 				type="search"
// 				ref={searchInput}
// 				placeholder="Search friend by email"
// 				onChange={handleOnChange}
// 				onFocus={() => {
// 					// setContainerBackgroundColor("#eeeeee");
// 					// setContainerBackgroundColor("transparent");
// 				}}
// 				onBlur={() => {
// 					// setContainerBackgroundColor("#eeeeee");
// 				}}
// 				value={searchQuery}
// 			/>
// 			<button onClick={handleReset}>
// 				<img
// 					src={closeSearch}
// 					height={20}
// 					width={20}
// 					style={{ visibility: `${clearButtonVisibility}` }}
// 				/>
// 			</button>
// 		</div>
// 	);
// };

export default SearchBar;
