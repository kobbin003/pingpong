export type TError = {
	status: number;
	data: { error: { statusCode: number; msg: string } };
};
