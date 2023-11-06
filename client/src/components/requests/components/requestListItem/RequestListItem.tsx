type Props = {};

const RequestListItem = ({}: Props) => {
	return (
		<li className="flex flex-col border border-black">
			<p>name</p>
			<button>accept request</button>
		</li>
	);
};

export default RequestListItem;
