export type TMessage = {
	_id: string;
	message: string;
	sender: string;
	createdAt: Date;
	chat:
		| {
				_id: string;
				relation: {
					_id: string;
				};
		  }
		| string;
};
