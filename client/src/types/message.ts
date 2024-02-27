export type TMessage = {
	_id: string;
	message: string;
	sender: string;
	createdAt: Date;
	read: boolean;
	chat:
		| {
				_id: string;
				relation: {
					_id: string;
				};
		  }
		| string;
};
