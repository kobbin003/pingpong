export type TMessage = {
	_id: string;
	message: string;
	sender: string;
	createdAt: string;
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
