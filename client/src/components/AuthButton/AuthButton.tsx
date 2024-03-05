type Props = {
	img: string;
	bgColor: string;
	desc: string;
	onClick?: () => void;
};

const AuthButton = ({ img, bgColor, desc, onClick }: Props) => {
	return (
		<button
			className={`${bgColor} flex items-center justify-center py-1 rounded-sm border w-full`}
			onClick={onClick}
		>
			<img src={img} alt="" height={20} width={20} />
			<p className="pl-2">{desc}</p>
		</button>
	);
};

export default AuthButton;
