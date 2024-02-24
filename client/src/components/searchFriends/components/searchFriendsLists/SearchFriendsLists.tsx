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
			<button
				onClick={handleSearch}
				className="btn btn-sm border bg-blue-400 hover:bg-blue-400 rounded-sm w-max lowercase font-normal text-white my-2"
			>
				search
			</button>
			{result.currentData ? (
				// <>
				// </>
				<div className="my-2 flex flex-col gap-2 text-sm border-b border-b-black/10 pb-2">
					<div className="flex gap-2 items-center">
						<img
							src={
								result.currentData.profilePicUrl ||
								"/src/assets/defaultProfilePic.svg"
							}
							alt=""
							className="h-8 w-8 "
						/>
						<p className=" ">{result.currentData?.name}</p>
					</div>
					<button className="btn btn-sm border bg-blue-300 hover:bg-blue-400 rounded-sm w-max lowercase font-normal">
						send request
					</button>
				</div>
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
