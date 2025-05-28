import { Suspense, lazy, useContext } from "react";
// import ChatsList from "../chatsList/ChatsList";
// import Request from "../requests/Request";
// import Friends from "../friends/Friends";
import {
	ShowConversationContext,
	Ttabs,
} from "../../context/ShowConversationProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ChatsList = lazy(() => import("../chatsList/ChatsList"));
const Request = lazy(() => import("../requests/Request"));
const Friends = lazy(() => import("../friends/Friends"));

const ChatNav = () => {
	const { showConversation, activeTab, setActiveTab } = useContext(
		ShowConversationContext
	);
	// const [activeTab, setActiveTab] = useState<string>("chats");

	const handleValueChange = (val: string) => {
		setActiveTab(val as Ttabs);
	};

	console.log("showConversation: ", showConversation);
	return (
		<div
			className={`${
				showConversation ? "hidden sm:block" : "block"
			} fixed w-full sm:w-1/4 sm:min-w-max sm:relative h-full z-50 px-2 text-black border-r bg-white`}
		>
			{/* <div className="flex items-center gap-2">
				{!showConversation && (
					<Menu
						color="grey"
						size={24}
						onClick={() => {
							console.log("clicked");
							setShowConversation(true);
						}}
					/>
				)}
				<div className="py-2">
					<img src="/pingpong.png" alt="logo" width={100} />
				</div>
			</div> */}
			<div className="py-2">
				<img src="/pingpong.png" alt="logo" width={100} />
			</div>

			<Tabs
				value={activeTab}
				onValueChange={handleValueChange}
				className="flex-1 flex flex-col "
			>
				<TabsList className="grid grid-cols-3">
					<TabsTrigger value="chats">Chats</TabsTrigger>
					<TabsTrigger value="friends">Friends</TabsTrigger>
					<TabsTrigger value="requests">Requests</TabsTrigger>
				</TabsList>

				{/* Chats Tab Content */}
				<TabsContent value="chats" className="flex-1 overflow-auto">
					<div className="p-2">
						<Suspense fallback={<>Loading...</>}>
							<ChatsList />
						</Suspense>
					</div>
				</TabsContent>

				{/* Friends Tab Content */}
				<TabsContent value="friends" className="flex-1 overflow-auto">
					<Suspense fallback={<>Loading...</>}>
						<Friends />
					</Suspense>
				</TabsContent>

				{/* Requests Tab Content */}
				<TabsContent value="requests" className="flex-1 overflow-auto">
					<div className="p-2">
						<Suspense fallback={<>Loading...</>}>
							<Request />
						</Suspense>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

// const ChatNav = () => {
// 	const { showConversation } = useContext(ShowConversationContext);
// 	const [activeTab, setActiveTab] = useState<string>("chats");

// 	// const tabs: { [key: string]: FC } = {
// 	// 	chats: ChatsList,
// 	// 	friends: Friends,
// 	// 	requests: Request,
// 	// };

// 	// const handleTabSelection = (e: MouseEvent<HTMLButtonElement>) => {
// 	// 	const el = e.target as HTMLButtonElement;
// 	// 	const buttonText = el.innerText;
// 	// 	setActiveTab(buttonText);
// 	// };

// 	// const CurrentTabView = tabs[activeTab] ?? ChatsList;
// 	// console.log("showConversation", showConversation);

// 	return (
// 		// <div
// 		// 	className={`${
// 		// 		showConversation ? "hidden sm:block" : "block"
// 		// 	} fixed w-full sm:w-1/4 sm:min-w-max sm:relative h-full z-50 px-2 bg-white text-black`}
// 		// >
// 		// 	<div className="flex gap-2 tabs tabs-box">
// 		// 		{Object.keys(tabs).map((t) => {
// 		// 			const currentTab = t == activeTab;
// 		// 			return (
// 		// 				<button
// 		// 					onClick={handleTabSelection}
// 		// 					key={t}
// 		// 					className={`tab ${currentTab && "border-b"}`}
// 		// 				>
// 		// 					{t}
// 		// 				</button>
// 		// 			);
// 		// 		})}
// 		// 	</div>
// 		// 	<Suspense fallback={<>Loading...</>}>
// 		// 		<CurrentTabView />
// 		// 	</Suspense>
// 		// </div>
// 		<div
// 			className={`${
// 				showConversation ? "hidden sm:block" : "block"
// 			} fixed w-full sm:w-1/4 sm:min-w-max sm:relative h-full z-50 px-2 bg-white text-black`}
// 		>
// 			<Tabs
// 				value={activeTab}
// 				onValueChange={setActiveTab}
// 				className="flex-1 flex flex-col"
// 			>
// 				<TabsList className="grid grid-cols-3">
// 					<TabsTrigger value="chats">Chats</TabsTrigger>
// 					<TabsTrigger value="friends">Friends</TabsTrigger>
// 					<TabsTrigger value="requests">Requests</TabsTrigger>
// 				</TabsList>

// 				{/* Chats Tab Content */}
// 				<TabsContent value="chats" className="flex-1 overflow-auto">
// 					<div className="p-2">
// 						<Suspense fallback={<>Loading...</>}>
// 							<ChatsList />
// 						</Suspense>
// 					</div>
// 				</TabsContent>

// 				{/* Friends Tab Content */}
// 				<TabsContent value="friends" className="flex-1 flex flex-col">
// 					<Suspense fallback={<>Loading...</>}>
// 						<Friends />
// 					</Suspense>
// 				</TabsContent>

// 				{/* Requests Tab Content */}
// 				<TabsContent value="requests" className="flex-1 overflow-auto">
// 					<div className="p-2">
// 						<Suspense fallback={<>Loading...</>}>
// 							<Request />
// 						</Suspense>
// 					</div>
// 				</TabsContent>
// 			</Tabs>
// 		</div>
// 	);
// };

export default ChatNav;
