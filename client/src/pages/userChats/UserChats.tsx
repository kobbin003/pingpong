import ChatNav from "../../components/chatNav/ChatNav";
import Conversations from "../../components/conversations/Conversations";
import React, { createContext, useState } from "react";

type Props = {};

type ShowConversationContextType = {
	setShowConversation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowConversationContext =
	createContext<ShowConversationContextType>({
		setShowConversation: () => false,
	});

export const UserChats = ({}: Props) => {
	const [showConversation, setShowConversation] = useState(false);

	return (
		<div
			className="flex flex-col h-screen"
			data-theme="cupcake"
		>
			<ShowConversationContext.Provider value={{ setShowConversation }}>
				<div className="flex h-full bg-green-200">
					<div
						className={`${
							showConversation ? "hidden sm:block" : "block"
						} fixed w-full sm:w-max sm:relative h-full bg-orange-300`}
					>
						<ChatNav />
					</div>
					<Conversations />
				</div>
			</ShowConversationContext.Provider>
		</div>
	);
};
