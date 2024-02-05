import { TUserServer } from "./user";

export type TRelation = {
	_id: string;
	participants: TUserServer[];
	sender: string;
	status: "accepted" | "pending" | "declined";
};
