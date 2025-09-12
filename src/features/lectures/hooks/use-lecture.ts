import {
  useGetCourses,
  type CourseRecord,
} from '@/features/courses/hooks/use-get-courses';
import {
  useGetLectures,
  type LectureRecord,
} from '@/features/lectures/hooks/use-get-lectures';
import {
  useGetLessons,
  type LessonRecord,
} from '@/features/lessons/hooks/use-get-lessons';
import { useMemo } from 'react';

export type LessonWithLectures = {
  lesson: LessonRecord;
  lectures: LectureRecord[];
};

export type CourseWithLessons = {
  course: CourseRecord;
  lessons: LessonWithLectures[];
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
    data: lessons,
    isLoading: isLessonsLoading,
    error: lessonsError,
  } = useGetLessons();
  const {
    data: lectures,
    isLoading: isLecturesLoading,
    error: lecturesError,
  } = useGetLectures();

  const isLoading = isCoursesLoading || isLessonsLoading || isLecturesLoading;
  const error = coursesError || lessonsError || lecturesError;

  const data: CourseWithLessons[] | undefined = useMemo(() => {
    if (!courses || !lessons || !lectures) return undefined;

    // Filter courses by language pair if provided
    const filteredCourses = languagePair
      ? courses.filter(
          (course) =>
            course.source_language === languagePair.sourceLanguage &&
            course.target_language === languagePair.targetLanguage,
        )
      : courses;

    return (
      filteredCourses
        .map((course) => {
          const lessonsForCourse = lessons
            .filter((l) => l.course_id === course.id)
            .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

          const lessonsWithLectures: LessonWithLectures[] = lessonsForCourse
            .map((lesson) => ({
              lesson,
              lectures: lectures.filter(
                (lec) =>
                  lec.course_id === course.id && lec.lesson_id === lesson.id,
              ),
            }))
            // Only keep lessons that actually have lectures
            .filter((x) => x.lectures.length > 0);

          return { course, lessons: lessonsWithLectures };
        })
        // Only keep courses that have at least one lesson with lectures
        .filter((c) => c.lessons.length > 0)
    );
  }, [courses, lessons, lectures, languagePair]);

  return { data, isLoading, error };
};
