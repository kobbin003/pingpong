import { TUserServer } from "./user";

export type TRelation = {
	_id: string;
	participants: TUserServer[];
	sender: string;
	status: "accepted" | "pending" | "declined";
	chat: { _id: string; relation: string } | null;
};
