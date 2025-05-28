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

export const messageTimeFormat = (dateString: string) => {
	const date = new Date(dateString);
	// console.log(
	// 	"*_*_*_*_*_*_*_*_*_*_*_",
	// 	"date: ",
	// 	date,
	// 	" typof- ",
	// 	typeof date
	// );
	if (isToday(date)) {
		return date.toLocaleTimeString("en-US", {
			hour12: true,
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	if (isYesterday(date)) {
		return "Yesterday";
	}

	return date.toLocaleDateString();
	// return "demo time";
};

const isToday = (date: Date) => {
	const now = new Date();
	return (
		now.getFullYear() === date.getFullYear() &&
		now.getMonth() === date.getMonth() &&
		now.getDate() === date.getDate()
	);
};

const isYesterday = (date: Date) => {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	return (
		yesterday.getFullYear() === date.getFullYear() &&
		yesterday.getMonth() === date.getMonth() &&
		yesterday.getDate() === date.getDate()
	);
};
