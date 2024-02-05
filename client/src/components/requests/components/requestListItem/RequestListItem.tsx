import { useSelector } from "react-redux";
import { TRelation } from "../../../../types/relation";
import { RootState } from "../../../../redux/store/store";

type Props = { item: TRelation };

const RequestListItem = ({ item }: Props) => {
	const recipient = item.participants.filter(
		(user) => user._id !== item.sender
	)[0];
	const sender = item.participants.filter((user) => user._id == item.sender)[0];
	const user = useSelector((state: RootState) => state.user);
	const userIsTheSender = recipient._id == user.uid;
	console.log("user", user);
	console.log("recipient", recipient);
	return (
		<li className="flex flex-col border border-black">
			{userIsTheSender ? (
				<div>
					<p>{recipient.name}</p>
					<button> {item.status}</button>
				</div>
			) : (
				<div>
					<p>{sender.name}</p>
					<button>accept request: {item.status}</button>
				</div>
			)}
		</li>
	);
};

export default RequestListItem;
