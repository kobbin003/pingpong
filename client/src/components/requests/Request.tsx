import RequestsList from "./components/requestList/RequestsList";

// const requestStatusList = ["accepted", "declined", "pending"];
//* no need of selecting status
// we will only choose the "pending" requests in this section.
const Request = () => {
	// const [open, setOpen] = useState(false);
	// const [value, setValue] = useState<Status>("pending");
	return (
		<div>
			{/* <Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{value
							? requestStatusList.find((status) => status === value)
							: "Select request status type"}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Command>
						<CommandList>
							<CommandGroup>
								{requestStatusList.map((status) => (
									<CommandItem
										key={status}
										value={status}
										onSelect={(currentValue) => {
											setValue(currentValue as Status);
											setOpen(false);
										}}
									>
										{status}
										{value == status && <Check />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover> */}
			<RequestsList status={"pending"} />
		</div>
	);
};

export default Request;
