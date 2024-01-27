export type TSuccess = {
	status: number;
	data: any;
};

export type TError = {
	error: true;
	status: number;
	errMsg: string;
};
