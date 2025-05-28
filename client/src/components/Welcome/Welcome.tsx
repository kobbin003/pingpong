import { useContext } from "react";
import welcomeSvg from "../../assets/welcome.svg";
import { ShowConversationContext } from "@/context/ShowConversationProvider";
import { Menu } from "lucide-react";
import Signout from "../signout/Signout";
const Welcome = () => {
	const { setShowConversation, showConversation } = useContext(
		ShowConversationContext
	);
	return (
		<div>
			<div className="w-full fixed right-2 border-b flex justify-end py-1.5">
				<Signout />
			</div>
			<div className=" h-full flex flex-col justify-center items-center mt-10 gap-2">
				<h2 className="text-3xl">Welcome to ping-pong</h2>
				<p>Ready to chat with your friends?</p>
				<div className=" h-2/4">
					<img
						src={welcomeSvg}
						alt=""
						style={{ height: "100%", minHeight: "200px" }}
					/>
					<a
						className="h-1 underline text-xs"
						href="https://www.freepik.com/free-vector/new-message-concept-illustration_6183493.htm#fromView=search&term=illustrations+message&track=ais&regularType=vector&page=1&position=31&uuid=b0ac1596-2ff4-45d0-ad1b-050fb352b87a"
					>
						Image by storyset on Freepik
					</a>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
