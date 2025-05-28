import { useSelector } from "react-redux";
import RequestListItem from "../requestListItem/RequestListItem";
import { useGetRelationByStatusQuery } from "../../../../api/relations";
import { RootState } from "../../../../redux/store/store";

export type Status = "accepted" | "declined" | "pending";
type Props = {
	status: Status;
};
const RequestsList = ({ status }: Props) => {
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { data, error, isLoading } = useGetRelationByStatusQuery({
		accessToken,
		status,
	});

	if (error) console.error(error);
	// console.log("relation by status", status, "---", data, error, isLoading);
	return (
		<ul>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				data &&
				data.length > 0 &&
				data.map((relation) => (
					<RequestListItem key={relation._id} item={relation} status={status} />
				))
			)}
		</ul>
	);
};

export default RequestsList;
