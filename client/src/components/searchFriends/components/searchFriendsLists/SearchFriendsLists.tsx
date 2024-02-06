import { useEffect } from "react";
import { useLazyGetUserByEmailQuery } from "../../../../api/users";
import { isFetchBaseQueryError } from "../../../../utils/isFetchBaseQueryError";

type Props = { searchQuery: string };

const SearchFriendsLists = ({ searchQuery }: Props) => {
	console.log("friend lists", searchQuery);

	const [trigger, result, lastpromise] = useLazyGetUserByEmailQuery();

	const handleSearch = () => {
		trigger({ email: searchQuery });
	};

	useEffect(() => {
		console.log("query", result, lastpromise);
	}, [result]);

	return (
		<div>
			<button onClick={handleSearch} className="btn btn-primary">
				search
			</button>
			{result.currentData ? (
				<>
					<p>{result.currentData?.name}</p>
					<button>send request</button>
				</>
			) : (
				<></>
			)}
			{result.isError &&
				isFetchBaseQueryError(result.error) &&
				result.error.status == 404 && (
					<p>Could not find any user with that email</p>
				)}
		</div>
	);
};

export default SearchFriendsLists;
