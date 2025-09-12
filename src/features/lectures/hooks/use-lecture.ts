import {
  useGetCourses,
  type CourseRecord,
} from '@/features/courses/hooks/use-get-courses';
import {
  useGetLectures,
  type LectureRecord,
} from '@/features/lectures/hooks/use-get-lectures';
import { useMemo } from 'react';

export type CourseWithLectures = {
  course: CourseRecord;
  lectures: LectureRecord[];
};

export type LanguagePair = {
  sourceLanguage: string;
  targetLanguage: string;
};

export const useLecture = (languagePair?: LanguagePair | null) => {
  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useGetCourses();
  const {
    data: lectures,
    isLoading: isLecturesLoading,
    error: lecturesError,
  } = useGetLectures();

  const isLoading = isCoursesLoading || isLecturesLoading;
  const error = coursesError || lecturesError;

  const data: CourseWithLectures[] | undefined = useMemo(() => {
    if (!courses || !lectures) return undefined;

    // Filter courses by language pair if provided
    const filteredCourses = languagePair
      ? courses.filter(
          (course) =>
            course.source_language === languagePair.sourceLanguage &&
            course.target_language === languagePair.targetLanguage,
        )
      : courses;

    return filteredCourses
      .map((course) => {
        // Get lectures for this course and sort by order_index
        const lecturesForCourse = lectures
          .filter((lecture) => lecture.course_id === course.id)
          .sort((a, b) => {
            const orderA = parseInt(a.order_index ?? '0');
            const orderB = parseInt(b.order_index ?? '0');
            return orderA - orderB;
          });

        return {
          course,
          lectures: lecturesForCourse,
        };
      })
      // Only keep courses that have at least one lecture
      .filter((c) => c.lectures.length > 0)
      // Sort courses by their order_index
      .sort((a, b) => (a.course.order_index ?? 0) - (b.course.order_index ?? 0));
  }, [courses, lectures, languagePair]);

  return { data, isLoading, error };
};
