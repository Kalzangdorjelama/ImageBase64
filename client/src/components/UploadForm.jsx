export default function UploadForm({ file, setFile, onUpload, isLoading }) {
	return (
		<div className="bg-white rounded-xl shadow-lg p-8 mb-12">
			<h2 className="text-2xl font-bold text-slate-800 mb-6">Upload Image</h2>
			<div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
				<input
					type="file"
					accept="image/*"
					onChange={(e) => setFile(e.target.files?.[0] || null)}
					disabled={isLoading}
					className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition cursor-pointer"
				/>
				<button
					onClick={onUpload}
					disabled={!file || isLoading}
					className="px-8 py-3 bg-gray-950 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
				>
					{isLoading ? "Uploading..." : "Upload"}
				</button>
			</div>
			{file && (
				<p className="text-sm text-slate-600 mt-4">
					Selected: <span className="font-semibold">{file.name}</span>
				</p>
			)}
		</div>
	);
}
