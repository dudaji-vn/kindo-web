import LectureCard from '@/features/lectures/components/lecture-card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLecture, type LanguagePair } from '../hooks/use-lecture';

type LectureListProps = {
  languagePair?: LanguagePair | null;
};

const LectureList: React.FC<LectureListProps> = ({ languagePair }) => {
  const { data, isLoading } = useLecture(languagePair);
  const { t } = useTranslation(['common']);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600"></div>
          <div className="text-neutral-500">{t('LECTURE_LIST.LOADING')}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-5 md:gap-10">
      {(!data || data.length === 0) && (
        <div className="py-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-6xl">📚</div>
            <div className="text-lg text-gray-500">
              {languagePair
                ? t('LECTURE_LIST.NO_LECTURES_FOR_LANGUAGE')
                : t('LECTURE_LIST.NO_LECTURES')}
            </div>
            {languagePair && (
              <div className="text-sm text-gray-400">
                {t('LECTURE_LIST.TRY_DIFFERENT_LANGUAGE')}
              </div>
            )}
          </div>
        </div>
      )}

      {data?.map(({ course, lectures }, index) => (
        <React.Fragment key={course.id}>
          {index !== 0 && <div className="border-b border-neutral-100" />}
          <div key={course.id} className="grid gap-5">
            <span className="text-lg text-gray-600">
              {course.title || t('LECTURE_LIST.UNTITLED_COURSE')}
            </span>

            <div
              className="rounded-xls grid items-center justify-around gap-5 pb-2 sm:gap-10 md:gap-20"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 3fr))',
                width: '100%',
              }}
            >
              {/* Lectures directly in the course */}
              {lectures?.map((lecture, idx) => (
                <LectureCard
                  key={`${course.id}-${lecture.id}-${idx}`}
                  lecture={lecture}
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

LectureList.displayName = 'LectureList';
export default LectureList;
