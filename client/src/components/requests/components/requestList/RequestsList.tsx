import { useSelector } from "react-redux";
import RequestListItem from "../requestListItem/RequestListItem";
import { useGetRelationByStatusQuery } from "../../../../api/relations";
import { RootState } from "../../../../redux/store/store";

type Props = {};

const RequestsList = ({}: Props) => {
	// TODO change the status to "pending"
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const { data, error, isLoading } = useGetRelationByStatusQuery({
		accessToken,
		status: "accepted",
	});
	console.log("relation by status", data, error, isLoading);
	return (
		<ul>
			{data &&
				data.map((relation) => (
					<RequestListItem key={relation._id} item={relation} />
				))}
		</ul>
	);
};

export default RequestsList;
