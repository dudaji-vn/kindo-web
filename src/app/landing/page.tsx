'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Play,
	Smartphone,
	Star,
	GamepadIcon,
	Target,
	Mic,
	Trophy,
	Calendar,
	Zap,
	CheckCircle,
} from 'lucide-react';

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
			{/* Navigation */}
			<motion.nav
				className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100"
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6 }}
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<motion.div
						className="flex items-center space-x-2"
						whileHover={{ scale: 1.02 }}
					>
						<div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
							<span className="text-white font-bold text-lg">
								K
							</span>
						</div>
						<span className="text-2xl font-bold text-gray-800">
							Kindo
						</span>
					</motion.div>

					<div className="hidden md:flex items-center space-x-6">
						<a
							href="#features"
							className="text-gray-600 hover:text-orange-500 transition-colors"
						>
							Features
						</a>
						<a
							href="#about"
							className="text-gray-600 hover:text-orange-500 transition-colors"
						>
							About
						</a>
						<a
							href="#testimonials"
							className="text-gray-600 hover:text-orange-500 transition-colors"
						>
							Reviews
						</a>
					</div>

					<Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6">
						Download App
					</Button>
				</div>
			</motion.nav>

			{/* Hero Section */}
			<section className="pt-24 pb-16 px-4">
				<div className="container mx-auto max-w-6xl">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							className="space-y-8"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<div>
								<Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 mb-4">
									🎉 Now Available on iOS & Android
								</Badge>
								<h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
									Fun & Easy
									<br />
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
										Korean
									</span>
									<br />
									Learning
								</h1>
							</div>

							<p className="text-xl text-gray-600 leading-relaxed">
								Master Korean through interactive games,
								personalized learning paths, and speaking
								practice. Join thousands of learners on their
								Korean journey with Kindo!
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg"
								>
									<Play className="mr-2" size={20} />
									Start Learning Free
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
								>
									<Smartphone className="mr-2" size={20} />
									View Demo
								</Button>
							</div>

							<div className="flex items-center space-x-6 pt-4">
								<div className="flex items-center space-x-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="w-5 h-5 fill-yellow-400 text-yellow-400"
										/>
									))}
									<span className="ml-2 text-gray-600">
										4.9/5 (10K+ reviews)
									</span>
								</div>
							</div>
						</motion.div>

						<motion.div
							className="relative"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<div className="relative mx-auto w-80 h-96">
								{/* Phone mockup */}
								<div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-2">
									<div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-500 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
										{/* Cute Mascot */}
										<motion.div
											className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4"
											animate={{
												y: [0, -10, 0],
												rotate: [0, 5, -5, 0],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										>
											<span className="text-4xl">🐕</span>
										</motion.div>

										<h2 className="text-2xl font-bold text-center mb-2">
											Kindo
										</h2>
										<p className="text-center text-orange-100 mb-6">
											Ready to learn Korean?
										</p>

										<div className="w-32 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
											<span className="text-white font-semibold">
												시작하기
											</span>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-16 bg-white">
				<div className="container mx-auto max-w-6xl px-4">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<Badge className="bg-orange-100 text-orange-800 mb-4">
							Features
						</Badge>
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Everything You Need to Master Korean
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							From interactive games to personalized learning
							paths, Kindo provides all the tools you need for
							effective Korean learning.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: GamepadIcon,
								title: 'Learn Through Play',
								description:
									'Interactive games and challenges make learning Korean fun and engaging',
								color: 'text-green-500',
							},
							{
								icon: Target,
								title: 'Personalized Path',
								description:
									'AI-powered learning paths adapted to your goals and learning style',
								color: 'text-blue-500',
							},
							{
								icon: Mic,
								title: 'Speaking Practice',
								description:
									'Advanced speech recognition helps perfect your Korean pronunciation',
								color: 'text-purple-500',
							},
							{
								icon: Trophy,
								title: 'Achievement System',
								description:
									'Earn badges and rewards as you progress through your Korean journey',
								color: 'text-yellow-500',
							},
							{
								icon: Calendar,
								title: 'Daily Reminders',
								description:
									'Stay consistent with smart notifications and learning streaks',
								color: 'text-red-500',
							},
							{
								icon: Zap,
								title: 'Quick Lessons',
								description:
									'Bite-sized lessons that fit perfectly into your busy schedule',
								color: 'text-indigo-500',
							},
						].map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
							>
								<Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-200 group">
									<CardContent className="p-0">
										<div
											className={`w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
										>
											<feature.icon
												className={`w-6 h-6 ${feature.color}`}
											/>
										</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-2">
											{feature.title}
										</h3>
										<p className="text-gray-600">
											{feature.description}
										</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Learning Path Section */}
			<section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Badge className="bg-orange-100 text-orange-800 mb-4">
								Learning Path
							</Badge>
							<h2 className="text-4xl font-bold text-gray-900 mb-6">
								Your Personalized Korean Journey
							</h2>
							<p className="text-lg text-gray-600 mb-8">
								Our AI adapts to your learning style, pace, and
								goals to create a unique path just for you.
								Whether you&apos;re studying for work, travel,
								or personal growth, Kindo has you covered.
							</p>

							<div className="space-y-4">
								{[
									{
										title: 'Study Support',
										icon: '📚',
										description:
											'Comprehensive lessons covering grammar, vocabulary, and culture',
									},
									{
										title: 'Work Support',
										icon: '💼',
										description:
											'Business Korean and professional communication skills',
									},
									{
										title: 'Travel Ready',
										icon: '✈️',
										description:
											'Essential phrases and cultural insights for your Korean adventures',
									},
									{
										title: 'Personal Growth',
										icon: '❤️',
										description:
											'Connect with Korean culture and expand your worldview',
									},
								].map((item, index) => (
									<motion.div
										key={index}
										className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: index * 0.1,
										}}
										whileHover={{ x: 5 }}
									>
										<span className="text-2xl">
											{item.icon}
										</span>
										<div>
											<h4 className="font-semibold text-gray-900">
												{item.title}
											</h4>
											<p className="text-gray-600 text-sm">
												{item.description}
											</p>
										</div>
										<CheckCircle className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							className="relative"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<div className="bg-white rounded-2xl p-8 shadow-xl">
								<div className="text-center mb-6">
									<div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
										<span className="text-2xl">🐕</span>
									</div>
									<h3 className="text-xl font-semibold text-gray-900">
										Your Progress
									</h3>
									<p className="text-gray-600">
										Keep up the great work!
									</p>
								</div>

								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-gray-700">
											Daily Streak
										</span>
										<span className="font-semibold text-orange-600">
											7 days 🔥
										</span>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<motion.div
											className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
											initial={{ width: 0 }}
											whileInView={{ width: '70%' }}
											transition={{
												duration: 1,
												delay: 0.5,
											}}
										/>
									</div>
									<div className="flex items-center justify-between text-sm text-gray-600">
										<span>Beginner</span>
										<span>70% Complete</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id="testimonials" className="py-16 bg-white">
				<div className="container mx-auto max-w-6xl px-4">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<Badge className="bg-orange-100 text-orange-800 mb-4">
							Testimonials
						</Badge>
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Loved by Korean Learners Worldwide
						</h2>
						<p className="text-xl text-gray-600">
							Join thousands of successful Korean learners who
							chose Kindo
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								name: 'Sarah Chen',
								role: 'University Student',
								content:
									'Kindo made learning Korean so much fun! The games kept me motivated and I can actually have conversations now. 한국어를 배우는 것이 이렇게 재미있을 줄 몰랐어요!',
								avatar: '👩‍🎓',
								rating: 5,
							},
							{
								name: 'Mike Johnson',
								role: 'Business Professional',
								content:
									"As someone with a busy schedule, Kindo's bite-sized lessons were perfect. I learned Korean for my business trips to Seoul and it exceeded all expectations.",
								avatar: '👨‍💼',
								rating: 5,
							},
							{
								name: 'Emma Rodriguez',
								role: 'K-pop Fan',
								content:
									'Finally understanding K-dramas without subtitles was my dream! Kindo made it possible with their engaging lessons and cultural insights. 정말 감사합니다!',
								avatar: '👩‍🎤',
								rating: 5,
							},
						].map((testimonial, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
							>
								<Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-orange-100">
									<CardContent className="p-0">
										<div className="flex items-center mb-4">
											{[...Array(testimonial.rating)].map(
												(_, i) => (
													<Star
														key={i}
														className="w-4 h-4 fill-yellow-400 text-yellow-400"
													/>
												),
											)}
										</div>
										<p className="text-gray-600 mb-6 italic">
											&quot;{testimonial.content}&quot;
										</p>
										<div className="flex items-center space-x-3">
											<span className="text-2xl">
												{testimonial.avatar}
											</span>
											<div>
												<h4 className="font-semibold text-gray-900">
													{testimonial.name}
												</h4>
												<p className="text-sm text-gray-600">
													{testimonial.role}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50">
				<div className="container mx-auto max-w-4xl px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-5xl font-bold text-gray-900 mb-6">
							Ready to Start Your
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
								Korean Journey?
							</span>
						</h2>
						<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
							Join millions of learners worldwide and discover the
							joy of learning Korean with Kindo. Download now and
							get your first week free!
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
							<Button
								size="lg"
								className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg"
							>
								<Smartphone className="mr-2" size={20} />
								Download for iOS
							</Button>
							<Button
								size="lg"
								className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 text-lg"
							>
								<Smartphone className="mr-2" size={20} />
								Download for Android
							</Button>
						</div>

						<p className="text-sm text-gray-500">
							Free to download • No credit card required • Start
							learning immediately
						</p>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold">
										K
									</span>
								</div>
								<span className="text-xl font-bold">Kindo</span>
							</div>
							<p className="text-gray-400 mb-4">
								Making Korean learning fun, accessible, and
								effective for everyone.
							</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Product</h4>
							<div className="space-y-2">
								<a
									href="#features"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Features
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Pricing
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Download
								</a>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Support</h4>
							<div className="space-y-2">
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Help Center
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Contact Us
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Community
								</a>
							</div>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Connect</h4>
							<div className="space-y-2">
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Twitter
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									Instagram
								</a>
								<a
									href="#"
									className="block text-gray-400 hover:text-white transition-colors"
								>
									YouTube
								</a>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>
							&copy; 2024 Kindo. All rights reserved. Made with ❤️
							for Korean learners worldwide.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
