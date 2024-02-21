export const dateFormatter = (date: Date) => {
	// console.log("dateFormatter", date);
	const hr = date.getHours();
	const min = date.getMinutes();
	const sec = date.getSeconds();
	const day = date.getDay();
	const month = date.getMonth();
	const year = date.getFullYear();
	// console.log(typeof hr);
	return {
		hr: addPad(hr),
		min: addPad(min),
		sec: addPad(sec),
		day,
		month,
		year,
	};
};

const addPad = (num: number) => {
	const numStr = num.toString();

	return numStr.padStart(2, "0");
};
