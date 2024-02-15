export type TSocketMsg = {
	message: string;
	createdAt: string;
	// sender: string; //sender uid
};
export type TSocketMsgDb = TSocketMsg & { sender: string };
