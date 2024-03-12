import { FC, MouseEvent, Suspense, lazy, useContext, useState } from "react";
// import ChatsList from "../chatsList/ChatsList";
// import Request from "../requests/Request";
// import Friends from "../friends/Friends";
import { ShowConversationContext } from "../../context/ShowConversationProvider";

const ChatsList = lazy(() => import("../chatsList/ChatsList"));
const Request = lazy(() => import("../requests/Request"));
const Friends = lazy(() => import("../friends/Friends"));

type Props = {};

const ChatNav = ({}: Props) => {
	const { showConversation } = useContext(ShowConversationContext);
	const [tab, setTab] = useState<string>("chats");

	const tabs: { [key: string]: FC } = {
		chats: ChatsList,
		friends: Friends,
		requests: Request,
	};

	const handleTabSelection = (e: MouseEvent<HTMLButtonElement>) => {
		const el = e.target as HTMLButtonElement;
		const buttonText = el.innerText;
		setTab(buttonText);
	};

	const CurrentTab = tabs[tab] ?? ChatsList;
	// console.log("showConversation", showConversation);

	return (
		<div
			className={`${
				showConversation ? "hidden sm:block" : "block"
			} fixed w-full sm:w-1/4 sm:min-w-max sm:relative h-full z-50 px-2 bg-white`}
		>
			<div className="flex gap-2">
				{Object.keys(tabs).map((t) => {
					const currentTab = t == tab;
					return (
						<button
							onClick={handleTabSelection}
							key={t}
							className={`${currentTab && "border-b"}`}
						>
							{t}
						</button>
					);
				})}
			</div>
			<Suspense fallback={<>Loading...</>}>
				<CurrentTab />
			</Suspense>
		</div>
	);
};

export default ChatNav;
