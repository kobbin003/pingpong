import { Suspense, lazy } from "react";
// import ChatNav from "../../components/chatNav/ChatNav";
// import Conversations from "../../components/conversations/Conversations";
import { ShowConversationProvider } from "../../context/ShowConversationProvider";
const ChatNav = lazy(() => import("../../components/chatNav/ChatNav"));
const Conversations = lazy(
	() => import("../../components/conversations/Conversations")
);

export const ChatScreen = () => {
	return (
		<div
			className="flex flex-col h-screen text-xs sm:text-sm "
			// data-theme="cupcake"
		>
			<ShowConversationProvider>
				<div className="flex h-full">
					<Suspense fallback={<>Loading..</>}>
						<ChatNav />
					</Suspense>
					<Suspense fallback={<>Loading...</>}>
						<Conversations />
					</Suspense>
				</div>
			</ShowConversationProvider>
		</div>
	);
};
