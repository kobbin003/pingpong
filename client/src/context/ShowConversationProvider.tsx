import { ReactNode, createContext, useState } from "react";

type ShowConversationContextType = {
	showConversation: boolean;
	setShowConversation: React.Dispatch<React.SetStateAction<boolean>>;
	activeTab: Ttabs;
	setActiveTab: React.Dispatch<React.SetStateAction<Ttabs>>;
};

export type Ttabs = "chats" | "friends" | "requests";

export const ShowConversationContext =
	createContext<ShowConversationContextType>({
		showConversation: false,
		setShowConversation: () => false,
		activeTab: "chats",
		setActiveTab: () => "chats",
	});

export const ShowConversationProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [showConversation, setShowConversation] = useState(false);
	const [activeTab, setActiveTab] = useState<Ttabs>("chats");
	return (
		<ShowConversationContext.Provider
			value={{ showConversation, setShowConversation, activeTab, setActiveTab }}
		>
			{children}
		</ShowConversationContext.Provider>
	);
};
