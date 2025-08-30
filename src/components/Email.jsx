import React, { useState } from "react";

export default function Email() {
	const [header, setHeader] = useState("hello");
	const [placeholder, setPlaceholder] = useState("hello@example.com");
	const [buttonText, setButtonText] = useState("send");
	const [afterText, setAfterText] = useState("Thank you offer");
	const [closeTime, setCloseTime] = useState("2");

		return (
			<div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 mt-8">
				{/* Top Export Emails link */}
				<div className="mb-4">
					<section className="text-gray-900 font-semibold text-base transition-all">Email Popup in chat</section>
				</div>
				<div className="flex gap-6 mb-8">
					<div className="flex-1 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 flex flex-col items-center justify-center">
						<div className="w-56 h-96 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center p-6">
							<div className="text-lg font-bold text-gray-700 mb-2">{header || "Please introduce yourself:"}</div>
							<input
								type="email"
								className="w-full border-2 border-purple-300 rounded-lg px-3 py-2 mb-4 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
								placeholder={placeholder || "Enter your email"}
								disabled
							/>
							<button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow hover:opacity-90 transition-all">{buttonText || "Submit"}</button>
						</div>
					</div>
					<div className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-4 flex flex-col items-center justify-center">
						<div className="w-56 h-96 bg-white rounded-xl shadow-lg flex flex-col justify-center items-center p-6">
							<div className="w-full flex flex-col gap-2">
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">Place New Order</button>
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">Existing Orders</button>
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">Product information</button>
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">Chat with CC Executive</button>
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">FAQ's</button>
								<button className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">service center</button>
							</div>
							<div className="w-full mt-6 text-gray-600 text-sm">hi</div>
							<div className="w-full text-xs text-gray-400 text-right mt-2">Powered by Pushdaddy</div>
						</div>
					</div>
				</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">Email Popup Header:<span className="font-bold text-gray-900 ml-1">Please introduce yourself:</span></label>
				<input
					type="text"
					className="w-full border rounded-lg px-3 py-2 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					value={header}
					onChange={e => setHeader(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">Input Placeholder Text: <span className="font-bold text-gray-900 ml-1">eg Enter your email</span></label>
				<input
					type="text"
					className="w-full border rounded-lg px-3 py-2 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					value={placeholder}
					onChange={e => setPlaceholder(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">Button Text: <span className="font-bold text-gray-900 ml-1">eg Send</span></label>
				<input
					type="text"
					className="w-full border rounded-lg px-3 py-2 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					value={buttonText}
					onChange={e => setButtonText(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">After email Submitted: <span className="font-bold text-gray-900 ml-1">eg Thank You or Offer Some discount coupon</span></label>
				<input
					type="text"
					className="w-full border rounded-lg px-3 py-2 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					value={afterText}
					onChange={e => setAfterText(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block font-semibold text-gray-700 mb-1">Time Popup Should close after successful email collected: <span className="font-bold text-gray-900 ml-1">eg 2</span></label>
				<input
					type="number"
					className="w-full border rounded-lg px-3 py-2 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
					value={closeTime}
					onChange={e => setCloseTime(e.target.value)}
				/>
			</div>
		</div>
	);
}
