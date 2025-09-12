'use client';

import { LectureRecord } from '@/features/lectures/hooks/use-get-lectures';
import { useLecture } from '@/features/lectures/hooks/use-lecture';
import { LessonRecord } from '@/features/lessons/hooks/use-get-lessons';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function LectureCard({
  lecture,
  lesson,
}: {
  lecture: LectureRecord;
  lesson: LessonRecord;
}) {
  return (
    <div className="block self-start">
      <Link
        className="group flex flex-col items-center rounded-lg bg-transparent transition-transform hover:scale-[1.02] sm:w-[150px]"
        href={`/book/${lecture.id}` || '#'}
      >
        <div
          className={`relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-orange-200 text-white group-hover:shadow-lg`}
        >
          {lecture.cover_image_url ? (
            <Image
              src={lecture.cover_image_url}
              objectFit="cover"
              fill
              alt="Lecture Cover"
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-4">
              <div className="text font-medium">
                {lesson.title || 'Untitled Lesson'}
              </div>
              <div className="mt-1 text-sm opacity-90">
                {lesson.sub_title || 'No Subtitle'}
              </div>
            </div>
          )}
        </div>

        {/* Title below card */}
        <div className="mt-2 w-full px-2 pb-1 text-lg font-semibold">
          {lecture.title ?? `Lesson ${lesson.order_index} - ${lesson.title}`}
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const { data, isLoading } = useLecture();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-neutral-50">
        <div className="flex items-center px-5 py-5 md:px-10 lg:mx-[5vw]">
          <div className="flex flex-col items-center">
            <Image
              src={'/kindo-logo-light.svg'}
              width="136"
              height="40"
              alt=""
            />
            <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Online Lecture
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 px-5 py-5 md:gap-10 md:px-10 md:py-10 lg:mx-[5vw]">
        {(!data || data.length === 0) && (
          <div className="py-12 text-center">
            <div className="text-lg text-gray-500">No courses available</div>
          </div>
        )}

        {data?.map(({ course, lessons }, index) => (
          <React.Fragment key={course.id}>
            {index !== 0 && <div className="border-b border-neutral-100" />}
            <div key={course.id} className="grid gap-5">
              <span className="text-lg text-gray-600">
                {course.title || 'Untitled Course'}
              </span>

              <div
                className="rounded-xls grid items-center justify-around gap-5 pb-2 sm:gap-10 md:gap-20"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 3fr))',
                  width: '100%',
                }}
              >
                {/* Lessons inside the course */}
                {lessons.map(({ lesson, lectures }, idx1) => (
                  <React.Fragment key={lesson.id}>
                    {lectures?.map((lec, idx2) => (
                      <LectureCard
                        key={`${idx1}-${idx2}`}
                        lecture={lec}
                        lesson={lesson}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
