import { FC, MouseEvent, useState } from "react";
import ChatsList from "../chatsList/ChatsList";
import Request from "../requests/Request";
import Friends from "../friends/Friends";

type Props = {};

const ChatNav = ({}: Props) => {
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

	return (
		<div className="bg-red-300 h-full">
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
			<CurrentTab />
		</div>
	);
};

export default ChatNav;
