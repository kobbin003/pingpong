import { useSelector } from "react-redux";
import { TRelation } from "../../../../types/relation";
import { RootState } from "../../../../redux/store/store";

type Props = { item: TRelation };

const RequestListItem = ({ item }: Props) => {
	const { uid } = useSelector((state: RootState) => state.user);
	const contact = item.participants.filter((user) => user._id !== uid)[0];
	const sender = item.participants.filter((user) => user._id == item.sender)[0];
	const userIsTheSender = contact._id == uid;
	console.log("contact", contact);
	return (
		<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2">
			{userIsTheSender ? (
				<div className="w-full flex justify-between">
					<p>{contact.name}</p>
					<p className="badge badge-primary"> {item.status}</p>
				</div>
			) : item.status == "pending" ? (
				<div className="flex flex-col gap-1">
					<p>{sender.name}</p>
					<button className="btn btn-xs border bg-blue-300 hover:bg-blue-400 rounded-sm w-max lowercase font-normal">
						accept request
					</button>
				</div>
			) : (
				<div>
					<p>request activity not found</p>
				</div>
			)}
		</li>
	);
};

export default RequestListItem;
