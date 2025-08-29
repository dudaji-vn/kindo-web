'use client';

import { LectureRecord } from '@/features/lectures/hooks/use-get-lectures';
import { useLecture } from '@/features/lectures/hooks/use-lecture';
import { LessonRecord } from '@/features/lessons/hooks/use-get-lessons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function LectureCard({ lecture, lesson }: { lecture: LectureRecord; lesson: LessonRecord }) {


	return (
		<div className='block'>
		<Link className=" flex flex-col items-center sm:w-[150px]" href={`/book/${lecture.id}` || '#'}>
			<div className={`aspect-[3/4] w-full rounded-lg bg-orange-200 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
				{lecture.cover_image_url ? <Image
					src={lecture.cover_image_url}
					objectFit='cover'
					fill
					alt="Lecture Cover" />
					: <div className="flex-1 flex flex-col items-center justify-center p-4">
						<div className="text font-medium">
							{lesson.title || 'Untitled Lesson'}
						</div>
						<div className="text-sm mt-1 opacity-90">
{lesson.sub_title || 'No Subtitle'}
						</div>
					</div>}
			</div>

			{/* Title below card */}
			<div className="mt-2 w-full text-lg font-semibold">
				Lesson {lesson.order_index} - {lesson.title}
			</div>
		</Link></div>
	);
}

export default function Home() {
	const { data, isLoading } = useLecture();

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-gray-500">Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-neutral-50 border-b border-neutral-100">
				<div className="lg:mx-[5vw] py-5 flex items-center px-5 md:px-10">
					<div className="flex flex-col items-center">
						<Image src={'/kindo-logo-light.svg'} width="136" height="40" alt='' />
						<span className='font-bold text-lg text-neutral-800 dark:text-neutral-200'>Online Lecture</span>
					</div>
				</div>
			</div>

			<div className="flex-1 flex flex-col lg:mx-[5vw] gap-5 md:gap-10 py-5 md:py-10 px-5 md:px-10">
				{(!data || data.length === 0) && (
					<div className="text-center py-12">
						<div className="text-gray-500 text-lg">No courses available</div>
					</div>
				)}

				{data?.map(({ course, lessons },index) => (
					<React.Fragment key={course.id}>
						{index!==0&&<div className='border-b border-neutral-100 '/>}
					<div key={course.id} className='grid gap-5'>

						<span className="text-lg text-gray-600">
							{course.title || 'Untitled Course'}
						</span>

						<div 
						className="rounded-xls grid items-center justify-around gap-5 sm:gap-10 md:gap-20 pb-2"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 3fr))',
                  width: '100%',
                }}>

							{/* Lessons inside the course */}
							{lessons.map(({ lesson, lectures }, idx1) => (

								<React.Fragment key={lesson.id} 
							>
									{lectures?.map((lec, idx2) => (
	<LectureCard  key={`${idx1}-${idx2}`} lecture={lec} lesson={lesson} />
									))}
								</React.Fragment>

							))}
						</div>
					</div></React.Fragment>
				))}
			</div>
		</div>
	);
}
