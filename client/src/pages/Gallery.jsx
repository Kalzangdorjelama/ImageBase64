import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { imageApi } from "../services/imageApi";

export default function Gallery() {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(true);

	const fetchImages = async () => {
		setFetching(true);
		try {
			const fetchedImages = await imageApi.fetchAllImages();
			setImages(fetchedImages);
		} catch (error) {
			console.error("Failed to fetch images:", error);
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	const handleDelete = async (id) => {
		setLoading(true);
		try {
			await imageApi.deleteImage(id);
			setTimeout(() => {
				setLoading(false);
				fetchImages();
			}, 1000);
		} catch (error) {
			console.error("Delete failed:", error);
			setLoading(false);
		}
	};

	const handleDownload = (base64, name) => {
		const a = document.createElement("a");
		a.href = base64;
		a.download = name;
		a.click();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-slate-800 mb-4">
						Image Gallery
					</h2>
					<p className="text-slate-600 text-lg">
						{images.length} image{images.length !== 1 ? "s" : ""} in your
						library
					</p>
				</div>

				{loading ? (
					<Loader />
				) : fetching ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
							>
								<div className="bg-slate-200 h-64"></div>
								<div className="p-4 bg-slate-50 border-t">
									<p className="text-xs text-slate-400 mb-2 font-semibold">
										Base64 Code:
									</p>
									<div className="space-y-2">
										<div className="h-3 bg-slate-200 rounded"></div>
										<div className="h-3 bg-slate-200 rounded"></div>
										<div className="h-3 bg-slate-200 rounded w-3/4"></div>
									</div>
								</div>
								<div className="px-4 py-3 border-t border-slate-200">
									<div className="h-4 bg-slate-200 rounded w-2/3"></div>
								</div>
								<div className="px-4 py-4 flex gap-3 bg-slate-50 border-t">
									<div className="flex-1 h-10 bg-slate-200 rounded-lg"></div>
									<div className="flex-1 h-10 bg-slate-200 rounded-lg"></div>
								</div>
							</div>
						))}
					</div>
				) : images.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-slate-500 text-lg">
							No images uploaded yet. Start by uploading one!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{images.map((img) => (
							<div
								key={img._id}
								className="bg-white rounded-xl shadow-lg overflow-hidden"
							>
								<div className="bg-slate-100 flex items-center justify-center h-64 overflow-hidden">
									<img
										src={img.base64}
										alt={img.fileName}
										className="w-full h-full object-contain"
									/>
								</div>

								{/* Base64 Code */}
								<div className="p-4 bg-slate-50 border-t">
									<p className="text-xs text-slate-600 mb-2 font-semibold">
										Base64 Code:
									</p>
									<textarea
										readOnly
										value={img.base64}
										className="w-full h-24 p-3 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
									/>
								</div>

								<div className="px-4 py-3 border-t border-slate-200">
									<p className="text-sm font-semibold text-slate-800 truncate">
										{img.fileName}
									</p>
								</div>

								<div className="px-4 py-4 flex gap-3 bg-slate-50 border-t">
									<button
										onClick={() => handleDownload(img.base64, img.fileName)}
									className="flex-1 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 cursor-pointer"
								>
									Download
								</button>

								<button
									onClick={() => handleDelete(img._id)}
									className="flex-1 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 cursor-pointer"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
