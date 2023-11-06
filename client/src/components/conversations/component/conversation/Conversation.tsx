import { useParams } from "react-router-dom";

type Props = {};

const Conversation = ({}: Props) => {
	const { id } = useParams();
	return <div>Conversation- {id}</div>;
};

export default Conversation;
