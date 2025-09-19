import { LectureRecord } from '@/features/lectures/hooks/use-get-lectures';
import Image from 'next/image';
import Link from 'next/link';

const LectureCard = ({ lecture }: { lecture: LectureRecord }) => {
  return (
    <div className="self-start">
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
              fill
              alt="Lecture Cover"
              className="object-cover"
              sizes="150px"
              priority
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-4">
              <div className="text font-medium">
                {lecture.title || 'Untitled Lecture'}
              </div>
              <div className="mt-1 text-sm opacity-90">
                Lecture {lecture.order_index || 'N/A'}
              </div>
            </div>
          )}
        </div>

        {/* Title below card */}
        <div className="mt-2 w-full px-2 pb-1 text-lg font-semibold">
          {lecture.title || `Lecture ${lecture.order_index || 'N/A'}`}
        </div>
      </Link>
    </div>
  );
};

LectureCard.displayName = 'LectureCard';
export default LectureCard;
