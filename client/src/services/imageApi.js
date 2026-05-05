import axios from "axios";

const API = "http://localhost:5000/api/image";

export const imageApi = {
	fetchAllImages: async () => {
		try {
			const res = await axios.get(`${API}/all`);
			return res.data.images;
		} catch (error) {
			console.error("Error fetching images:", error);
			throw error;
		}
	},

	uploadImage: async (file) => {
		try {
			const formData = new FormData();
			formData.append("image", file);
			await axios.post(`${API}/upload`, formData);
		} catch (error) {
			console.error("Error uploading image:", error);
			throw error;
		}
	},

	deleteImage: async (id) => {
		try {
			await axios.delete(`${API}/${id}`);
		} catch (error) {
			console.error("Error deleting image:", error);
			throw error;
		}
	},
};
