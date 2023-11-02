import { useParams } from "react-router-dom";
import ChatNav from "../../components/chatNav/ChatNav";
import Conversations from "../../components/conversations/Conversations";
import React, { createContext, useState } from "react";

type Props = {};
type ShowChatListContextType = {
	setShowChatList: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ShowChatListContext = createContext<ShowChatListContextType>({
	setShowChatList: () => false,
});

const Layout1 = ({}: Props) => {
	const { id } = useParams();
	const [showChatList, setShowChatList] = useState(false);
	console.log("params", id);

	return (
		<div className="flex flex-col">
			<ShowChatListContext.Provider value={{ setShowChatList }}>
				<div className="flex">
					<div
						className={`${
							showChatList ? "block fixed z-10 w-screen" : "hidden w-max"
						} sm:block`}
					>
						<ChatNav />
					</div>
					<Conversations />
				</div>
			</ShowChatListContext.Provider>
		</div>
	);
};

export default Layout1;
