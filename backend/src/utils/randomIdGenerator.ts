// to give name to unnamed email account
export function randomIdGenerator() {
	const timeStamp = Date.now().toString(16).slice(3);
	const randomNumber = Math.floor(Math.random() * 4096)
		.toString(16)
		.padStart(3, "0");

	return `${randomNumber}_${timeStamp}`;
}
// console.log(randomIdGenerator());
