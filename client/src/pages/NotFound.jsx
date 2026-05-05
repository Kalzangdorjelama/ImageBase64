import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex items-center mt-30 justify-center p-8 overflow-hidden">
			<div className="text-center">
				<h1 className="text-9xl font-bold text-gray-700  mb-4">
					404
				</h1>
				<h2 className="text-4xl font-bold text-slate-800 mb-2">
					Page Not Found
				</h2>
				<p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
					Oops! The page you're looking for doesn't exist. It might have been
					moved or deleted.
				</p>
				<Link
					to="/"
					className="inline-block px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
}
