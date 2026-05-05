export default function Loader() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<style>{`
                @keyframes spinZoom {
                    0%   { transform: rotate(0deg) scale(0.5); }
                    50%  { transform: rotate(180deg) scale(9.4); }
                    100% { transform: rotate(360deg) scale(0.5); }
                }
                .animate-spin-zoom {
                    animation: spinZoom 8s linear infinite;
                }
            `}</style>
			<div className="text-center">
				<img
					src="https://foxbaltimore.com/resources/media2/1x1/1951/1440/975x0/90/2b7bc269-fac8-4ca0-bc1a-b9a79131b8cd-S2_FP_013.jpg"
					alt="loading"
					width={120}
					height={120}
					className="animate-spin-zoom mx-auto mb-4 rounded-full"
				/>
				<p className="text-slate-600 text-lg font-semibold">Processing...</p>
			</div>
		</div>
	);
}
