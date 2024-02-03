import { TUserServer } from "./user";

export type TChat = {
	_id: string;
	relation: { id: string; participants: TUserServer[] };
};
