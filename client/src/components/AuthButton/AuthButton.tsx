type Props = {
	img: string;
	bgColor: string;
	desc: string;
	onClick?: () => void;
};

const AuthButton = ({ img, bgColor, desc, onClick }: Props) => {
	return (
		<button
			className={`${bgColor} flex items-center justify-center py-2 px-8 rounded-md border border-black w-full`}
			onClick={onClick}
		>
			<img src={img} alt="" height={20} width={20} />
			<p className="pl-2">{desc}</p>
		</button>
	);
};

export default AuthButton;
