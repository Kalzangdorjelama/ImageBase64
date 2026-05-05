export default function ImageCard({
	image,
	onDelete,
	onDownload,
	isLoading,
}) {
	return (
		<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
			<div className="relative h-48 bg-slate-100">
				<img
					src={image.imageUrl}
					alt={image.imageName}
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-6">
				<h3 className="font-semibold text-slate-800 mb-2 truncate">
					{image.imageName}
				</h3>
				<p className="text-sm text-slate-500 mb-4">
					{new Date(image.createdAt).toLocaleDateString()}
				</p>
				<div className="flex gap-3">
					<button
						onClick={() => onDownload(image.imageUrl, image.imageName)}
						className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
					>
						Download
					</button>
					<button
						onClick={() => onDelete(image._id)}
						disabled={isLoading}
						className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
