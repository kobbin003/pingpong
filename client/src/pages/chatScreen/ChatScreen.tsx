import ChatNav from "../../components/chatNav/ChatNav";
import Conversations from "../../components/conversations/Conversations";
import { ShowConversationProvider } from "../../context/ShowConversationProvider";

type Props = {};

export const ChatScreen = ({}: Props) => {
	return (
		<div
			className="flex flex-col h-screen text-xs sm:text-sm"
			// data-theme="cupcake"
		>
			<ShowConversationProvider>
				<div className="flex h-full">
					<ChatNav />
					<Conversations />
				</div>
			</ShowConversationProvider>
		</div>
	);
};
