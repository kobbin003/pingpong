import { useState } from "react";
import { FriendsList } from "../friendsList/FriendsList";
import SearchFriends from "../searchFriends/SearchFriends";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Friends = () => {
	const [activetab, setActiveTab] = useState<string>("friends");

	return (
		<div className="">
			<Tabs
				value={activetab}
				onValueChange={setActiveTab}
				className="flex-1 flex flex-col"
			>
				<TabsList className="grid grid-cols-2 mx-2 mt-2">
					<TabsTrigger value="friends">Friends</TabsTrigger>
					<TabsTrigger value="search">Search</TabsTrigger>
				</TabsList>

				<TabsContent value="friends" className="flex-1 overflow-auto p-2">
					<FriendsList />
				</TabsContent>

				<TabsContent value="search" className="flex-1 overflow-auto p-2">
					<SearchFriends />
				</TabsContent>
			</Tabs>
		</div>
	);
};
// const Friends = () => {
// 	const [tab, setTab] = useState<string>("friends");

// 	const tabs: { [key: string]: FC } = {
// 		friends: FriendsList,
// 		search: SearchFriends,
// 	};

// 	const handleTabSelection = (e: MouseEvent<HTMLButtonElement>) => {
// 		const el = e.target as HTMLButtonElement;
// 		const buttonText = el.innerText;
// 		setTab(buttonText);
// 	};

// 	const CurrentTab = tabs[tab] ?? FriendsList;

// 	return (
// 		<div className="">
// 			<div className="flex gap-2">
// 				{Object.keys(tabs).map((t) => {
// 					const currentTab = t == tab;
// 					return (
// 						<button
// 							onClick={handleTabSelection}
// 							key={t}
// 							className={`${currentTab && "border-b"}`}
// 						>
// 							{t}
// 						</button>
// 					);
// 				})}
// 			</div>
// 			<CurrentTab />
// 		</div>
// 	);
// };

export default Friends;
