import { useSendRequestMutation } from "@/api/relations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useLazyGetUserByEmailQuery } from "../../../../api/users";
import defaultProfilePic from "../../../../assets/defaultProfilePic.svg";
import { isFetchBaseQueryError } from "../../../../utils/isFetchBaseQueryError";
import { useEffect } from "react";

type Props = { searchQuery: string };

const SearchFriendsLists = ({ searchQuery }: Props) => {
	// console.log("friend lists", searchQuery);
	const { accessToken } = useSelector((state: RootState) => state.auth);

	// console.log("accessToken: ", accessToken);
	const [trigger, result, lastpromise] = useLazyGetUserByEmailQuery();

	const [sendRequest, sendRequestResult] = useSendRequestMutation();
	// console.log("send-request", sendRequestResult);

	const handleSearch = () => {
		// console.log("searchQuery: ", searchQuery);
		trigger({ email: searchQuery });
	};

	const handleSendRequest = () => {
		if (result) {
			const recipientId = result?.data?._id || "";
			sendRequest({ accessToken, recipientId });
		}
	};

	useEffect(() => {
		console.log("query", result, lastpromise);
	}, [result]);

	return (
		<div>
			<Button
				onClick={handleSearch}
				className="btn btn-sm border rounded-sm w-max lowercase font-normal text-white my-2"
			>
				search
			</Button>
			{result.currentData ? (
				// <>
				// </>
				<div className="my-2 flex flex-col gap-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer mb-2 p-2">
					<div className="flex ">
						<div className="relative cursor-pointer">
							<Avatar>
								<AvatarImage
									src={result.currentData.profilePicUrl || defaultProfilePic}
									alt=""
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
						<div
							// className="flex gap-2"
							className="ml-3 flex-1"
						>
							<p className="font-medium">{result.currentData?.name}</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{result.currentData?.email}
							</p>
						</div>
					</div>
					{sendRequestResult.isSuccess ? (
						<p>Friend Request sent</p>
					) : (
						<Button className="w-max self-end" onClick={handleSendRequest}>
							{sendRequestResult?.isLoading ? "sending.." : "Send request"}
						</Button>
					)}
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
