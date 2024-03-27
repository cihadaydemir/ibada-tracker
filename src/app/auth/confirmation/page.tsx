export default function ConfirmationPage() {
	return (
		<div className="container gap-5 text-lg flex flex-row items-center justify-center mt-10">
			<div className="w-[450px]">
				<h3 className=" text-2xl font-semibold tracking-tight">Confirmation needed!</h3>
				<p className="leading-7 [&:not(:first-child)]:mt-6">
					Confirmation email sent to your mail adres, please check your inbox and spam folder for
					confirmation.
				</p>
			</div>
		</div>
	)
}
