import { LectureRecord } from '@/features/lectures/hooks/use-get-lectures';
import { LessonRecord } from '@/features/lessons/hooks/use-get-lessons';
import Image from 'next/image';
import Link from 'next/link';

const LectureCard = ({
  lecture,
  lesson,
}: {
  lecture: LectureRecord;
  lesson: LessonRecord;
}) => {
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
};

LectureCard.displayName = 'LectureCard';
export default LectureCard;
