import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import UploadForm from "../components/UploadForm";
import { imageApi } from "../services/imageApi";

export default function Home() {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleUpload = async () => {
		if (!file) return;

		setLoading(true);
		try {
			await imageApi.uploadImage(file);
			toast.success("Image uploaded successfully!");
			setTimeout(() => {
				setLoading(false);
				setFile(null);
				navigate("/gallery");
			}, 2000);
		} catch (error) {
			toast.error("Upload failed! Please try again.");
			console.error("Upload failed:", error);
			setLoading(false);
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-slate-800 mb-4">
						Upload Your Images
					</h2>
					<p className="text-slate-600 text-lg">
						Convert and manage your images seamlessly
					</p>
				</div>

				<UploadForm
					file={file}
					setFile={setFile}
					onUpload={handleUpload}
					isLoading={loading}
				/>

				<div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
					<h3 className="font-semibold text-gray-900 mb-2">How it works</h3>
					<ul className="text-gray-700 space-y-2 text-sm">
						<li>✓ Select an image file from your device</li>
						<li>✓ Click Upload to convert it to Base64 format</li>
						<li>✓ View all your uploads in the Gallery</li>
						<li>✓ Download or delete images anytime</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
