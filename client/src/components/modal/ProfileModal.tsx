import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

type Props = {};

const ProfileModal = ({}: Props, ref: any) => {
	const { email, email_verified, name, profilePicUrl, status } = useSelector(
		(state: RootState) => state.modal
	);
	return (
		<dialog id="my_modal_3" className="modal" ref={ref}>
			<div className="modal-box">
				{/* if there is a button in form, it will close the modal */}
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>

				<div className="flex flex-col gap-2 pb-2 items-center border-b">
					<img
						src={profilePicUrl || "/src/assets/defaultProfilePic.svg"}
						className="h-48"
					/>

					<p>{name}</p>
					<p>mail: {email}</p>
					{email_verified && <p>show something if email_verified</p>}
				</div>
				<p className="bg-gray-300 text-center p-2">{status}</p>
			</div>
		</dialog>
	);
};

export default forwardRef(ProfileModal);
