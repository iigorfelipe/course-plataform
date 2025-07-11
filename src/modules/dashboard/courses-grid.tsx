'use client';

import Link from 'next/link';
import { BookOpen, Clock, Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { getCategoryIcon, getLevelColor, getTotalDuration, getTotalLessons } from '@utils/get';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { modalAtom } from '@store/modals';
import type { Course } from '@contracts/course';

export const CoursesGrid = () => {
  const courses = useAtomValue(courseAtom.courses);
  const isLoaded = useAtomValue(courseAtom.isLoaded);
  const setCourse = useSetAtom(courseAtom.course);
  const openDeleteCourseModal = useSetAtom(modalAtom.openDeleteCourseModal);

  const handleDeleteCourseClick = (courseId: string) => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const foundCourse = savedCourses.find((c: Course) => c.id === courseId);

    if (foundCourse) {
      setCourse(foundCourse);
      openDeleteCourseModal();
    } else {
      alert('Não possivel abrir');
    }

    openDeleteCourseModal();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <Card
          key={course.id}
          className={`glass-effect border-white/20 card-hover group ${
            isLoaded ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: `${0.1 * index}s` }}
        >
          <CardContent className="p-0">
            <div className="relative overflow-hidden rounded-t-xl">
              {course.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={course.thumbnail || '/placeholder.svg'}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-6xl">{getCategoryIcon(course.category)}</span>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge
                  className={`${
                    course.published ? 'bg-green-500/90' : 'bg-yellow-500/90'
                  } text-white border-0`}
                >
                  {course.published ? 'Publicado' : 'Rascunho'}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                  {course.title}
                </h3>
              </div>

              <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${getLevelColor(course.level)} text-xs font-medium`}>
                  {course.level === 'beginner'
                    ? 'Iniciante'
                    : course.level === 'intermediate'
                    ? 'Intermediário'
                    : 'Avançado'}
                </Badge>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <BookOpen className="w-4 h-4" />
                  {getTotalLessons(course)} aulas
                </div>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  {getTotalDuration(course)}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCourseClick(course.id)}
                  className="bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30"
                >
                  <Trash2 className="size-4" />
                </Button>
                <Link href={`/course/${course.id}/edit`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Link href={`/course/${course.id}/preview`} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
