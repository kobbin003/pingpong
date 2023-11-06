import { FC, MouseEvent, useState } from "react";
import { FriendsList } from "../friendsList/FriendsList";
import SearchFriends from "../searchFriends/SearchFriends";

type Props = {};

const Friends = ({}: Props) => {
	const [tab, setTab] = useState<string>("friends");

	const tabs: { [key: string]: FC } = {
		friends: FriendsList,
		search: SearchFriends,
	};

	const handleTabSelection = (e: MouseEvent<HTMLButtonElement>) => {
		const el = e.target as HTMLButtonElement;
		const buttonText = el.innerText;
		setTab(buttonText);
	};

	const CurrentTab = tabs[tab] ?? FriendsList;

	return (
		<div className="bg-red-300">
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

export default Friends;
