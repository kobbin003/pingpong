import {
	useGetWelcomeQuery,
	useLazyGetWelcomeQuery,
} from "../api/welcomeQuery";
import { TError } from "../types/error";
const Trial = () => {
	const { data, error, isLoading } = useGetWelcomeQuery();
	const errorCustom = error as TError;
	console.log("data-welcome", data, error, isLoading);
	console.log("error", errorCustom.data.error.msg);
	// if (isFetchBaseQueryError(error)) {
	// 	console.log("errr......", error.);
	// }
	/**
	 * response with status other than 2.. will get set as error in rtk query
	 *
	 * */
	fetch("http://localhost:3000/welcome")
		.then((res) => {
			console.log(res.ok);
			return res.json();
		})
		.then((data) => console.log("welcome", data))
		.catch((err) => console.log("welcome error", err));

	const [trigger, result, lastPromiseInfo] = useLazyGetWelcomeQuery();
	return <div>Welcome</div>;
};

export default Trial;
