import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
	return (
		<>
			<Toaster position="top-right" />
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/gallery" element={<Gallery />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}
