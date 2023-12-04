import { ChangeEvent, FormEvent, useState } from "react";
import { sendEmailLinkLogin } from "../../firebase/authHandlers/sendEmailLinkLogin";

type Props = {};

const EmailLinkForm = ({}: Props) => {
	const [email, setEmail] = useState("");
	const sendEmailLinkRequest = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendEmailLinkLogin(email);
	};
	const trackInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<form onSubmit={sendEmailLinkRequest}>
			<input
				type="email"
				name=""
				id=""
				value={email}
				onChange={trackInputValueChange}
			/>
			<button type="submit">send email link</button>
		</form>
	);
};

export default EmailLinkForm;
