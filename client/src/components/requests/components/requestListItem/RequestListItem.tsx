import { useCreateNewChatMutation } from "@/api/chats";
import { useHandleFriendRequestMutation } from "@/api/relations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import defaultProfilePic from "../../../../assets/defaultProfilePic.svg";
import { RootState } from "../../../../redux/store/store";
import { TRelation } from "../../../../types/relation";
import { Status } from "../requestList/RequestsList";

type Props = { item: TRelation; status: Status };

const RequestListItem = ({ item }: Props) => {
	// console.log("requestlistitem.......", item);
	const { uid } = useSelector((state: RootState) => state.user);
	// console.log("auth-user-uid---------------------: ", uid);
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const contact = item.participants.filter((user) => user._id !== uid)[0];
	// console.log("contact---------------------: ", contact);
	const sender = item.participants.filter((user) => user._id == item.sender)[0];
	// console.log("sender---------------------: ", sender);
	const userIsTheSender = item.sender == uid;

	const [handleRequest, handleRequestResult] = useHandleFriendRequestMutation();

	const [createNewChat, createNewChatResult] = useCreateNewChatMutation();

	// console.log("createNewChatResult..........", createNewChatResult);

	// console.log("handleRequestResult:------------ ", handleRequestResult);
	const handleAcceptRequest = async () => {
		try {
			// accept request
			await handleRequest({
				accessToken,
				relationId: item._id,
				isAccepted: true,
			}).unwrap();
			//* unwrap converts the mutation into a promise

			// create a new chat for the relation
			// only after successful "accept" of request
			await createNewChat({ accessToken, relationId: item._id });
		} catch (error) {
			// ❌ If there's any error (400, 500, etc.), it will land here
			console.error("Something went wrong:", error);
		}
	};

	const handleRejectRequest = () => {
		handleRequest({ accessToken, relationId: item._id, isAccepted: false });
	};

	return (
		<li className="my-2 flex items-center text-sm pb-2 ">
			{item.status == "pending" ? (
				<div className="flex flex-col gap-1 w-full">
					{handleRequestResult.isLoading || createNewChatResult.isLoading ? (
						<p>Loading...</p>
					) : userIsTheSender ? (
						<div className="my-2 flex flex-col gap-2 text-sm p-3 hover:bg-gray-100 dark:hover:bg-gray-800  rounded cursor-pointer mb-2">
							<div className="flex">
								<div className="relative cursor-pointer">
									<Avatar>
										<AvatarImage
											src={contact.profilePicUrl || defaultProfilePic}
											alt=""
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<div className="ml-3 flex-1">
									<p className="font-medium">{contact.name}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{contact.email}
									</p>
								</div>
							</div>
							<Badge className="self-end bg-yellow-400 p-2 text-black hover:bg-yellow-400 hover:text-black">
								{" "}
								{item.status}
							</Badge>
						</div>
					) : (
						<div className="my-2 flex flex-col gap-3 text-sm p-3 hover:bg-gray-100 dark:hover:bg-gray-800  rounded cursor-pointer mb-2">
							<div className="flex ">
								<div className="relative cursor-pointer">
									<Avatar>
										<AvatarImage
											src={contact.profilePicUrl || defaultProfilePic}
											alt=""
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
								<div
									// className="flex gap-2"
									className="ml-3 flex-1"
								>
									<p className="font-medium">{sender.name}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{sender.email}
									</p>
								</div>
							</div>

							<div className="flex gap-2">
								<Button
									className="btn btn-xs border rounded-sm w-max lowercase font-normal"
									onClick={handleAcceptRequest}
								>
									Accept request
								</Button>
								<Button
									className="btn btn-xs border rounded-sm w-max lowercase font-normal"
									onClick={handleRejectRequest}
								>
									Reject request
								</Button>
							</div>
						</div>
					)}
				</div>
			) : null}
		</li>
	);
};

export default RequestListItem;
