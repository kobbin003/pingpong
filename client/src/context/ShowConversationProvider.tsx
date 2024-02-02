import { ReactNode, createContext, useState } from "react";

type ShowConversationContextType = {
	showConversation: boolean;
	setShowConversation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShowConversationContext =
	createContext<ShowConversationContextType>({
		showConversation: false,
		setShowConversation: () => false,
	});

export const ShowConversationProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [showConversation, setShowConversation] = useState(false);

	return (
		<ShowConversationContext.Provider
			value={{ showConversation, setShowConversation }}
		>
			{children}
		</ShowConversationContext.Provider>
	);
};
