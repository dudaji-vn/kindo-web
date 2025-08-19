import Image from 'next/image';

export default function Home() {
	return (
		<div className="w-full h-screen relative">
			<Image
				src="/landing.png"
				alt="Kindo"
				fill
				quality={100}
				className="w-full h-full object-cover"
			/>
		</div>
	);
}
