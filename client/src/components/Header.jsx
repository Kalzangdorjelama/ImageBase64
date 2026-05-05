import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-8 py-6">
				<div className="flex justify-between items-center">
					<Link
						to="/"
						className="text-3xl font-bold bg-gray-950 bg-clip-text text-transparent hover:opacity-80 transition"
					>
						Image ⇄ Base64
					</Link>
					<nav className="flex gap-6">
						<Link
							to="/"
							className="text-slate-600 hover:text-gray-700 font-medium transition"
						>
							Upload
						</Link>
						<Link
							to="/gallery"
							className="text-slate-600 hover:text-gray-700 font-medium transition"
						>
							Gallery
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}
