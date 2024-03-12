import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketProvider from "../../context/SocketProvider";
import { RootState } from "../../redux/store/store";
import { useGetUserProfileQuery } from "../../api/users";
import { setUser } from "../../redux/reducers/userSlice";
import { auth } from "../../firebase/config";
import { setAccessToken } from "../../redux/reducers/authSlice";
import { ChatScreen } from "../chatScreen/ChatScreen";
type Props = {};

const Home = ({}: Props) => {
	const dispatch = useDispatch();

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { data, error, isLoading, status } = useGetUserProfileQuery(
		{ accessToken },
		{ skip: !accessToken }
	);

	if (error) {
		console.log("userchats error", error);
	}

	// console.log("userprofile-data", data, error, isLoading);

	// user state update
	useEffect(() => {
		if (data && status == "fulfilled") {
			const { name, email, email_verified, status, profilePicUrl, _id } = data;
			// console.log(
			// 	"userprofile-data",
			// 	name,
			// 	email,
			// 	email_verified,
			// 	status,
			// 	profilePicUrl,
			// 	_id
			// );
			dispatch(
				setUser({
					name,
					email,
					email_verified,
					status,
					profilePicUrl: profilePicUrl || "",
					uid: _id,
				})
			);
		}
	}, [data]);

	// const [showConversation, setShowConversation] = useState(false);
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		console.log("User is signed in.", user);
	// 	} else {
	// 		console.log("User is not-signed in.");
	// 	}
	// });
	// console.log(auth.currentUser);

	// access token re-fetching every 55 min
	useEffect(() => {
		//* step-1: fetch the token whenever the component is refreshed:
		auth.currentUser?.getIdToken(true).then((token) => {
			const accessToken = token as string;
			console.log("access-token-refetched", accessToken);
			dispatch(setAccessToken(accessToken));
		});

		//* step-2: refetch token every 55 min(firebase accessToken has 1 hr life)
		//* and store it in auth store as accessToken

		// 55 min = 55 * 60sec = 55 * 60 * 1000ms = 3300000ms

		console.log("interval set");
		const fetchTokenInterval = setInterval(() => {
			auth.currentUser?.getIdToken(true).then((token) => {
				const accessToken = token as string;
				console.log("access-token-refetched", accessToken);
				dispatch(setAccessToken(accessToken));
			});
		}, 33e5);

		return () => {
			//* step-3: remove the fetchInterval handler
			console.log("interval removed");
			return clearInterval(fetchTokenInterval);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<SocketProvider accessToken={accessToken}>
					<ChatScreen />
				</SocketProvider>
			)}
		</>
	);
};

export default Home;
