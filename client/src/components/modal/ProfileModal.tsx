import { forwardRef } from "react";

type Props = {};

const ProfileModal = ({}: Props, ref: any) => {
	return (
		<dialog
			id="my_modal_3"
			className="modal"
			ref={ref}
		>
			<div className="modal-box">
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
				</form>
				<h1>Profile</h1>
			</div>
		</dialog>
	);
};

export default forwardRef(ProfileModal);
