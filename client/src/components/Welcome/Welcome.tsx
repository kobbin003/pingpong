import welcomeSvg from "../../assets/welcome.svg";
const Welcome = () => {
	return (
		<div className=" h-full flex flex-col justify-center items-center">
			<h2 className="text-xl">Welcome to ping-pong</h2>
			<p>Ready to start chatting?</p>
			<div className=" h-2/4">
				<img
					src={welcomeSvg}
					alt=""
					style={{ height: "100%", minHeight: "200px" }}
				/>
				<a
					className="h-1 underline"
					href="https://www.freepik.com/free-vector/new-message-concept-illustration_6183493.htm#fromView=search&term=illustrations+message&track=ais&regularType=vector&page=1&position=31&uuid=b0ac1596-2ff4-45d0-ad1b-050fb352b87a"
				>
					Image by storyset on Freepik
				</a>
			</div>
		</div>
	);
};

export default Welcome;
