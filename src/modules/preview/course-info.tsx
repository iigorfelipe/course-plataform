'use client';

import { Clock, BookOpen, Download, Share2, Heart } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { useAtom, useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import {
  getCategoryIcon,
  getCategoryLabel,
  getLevelLabel,
  getTotalDuration,
  getTotalLessons,
} from '@utils/get';
import { toast } from 'sonner';
import { compressToBase64Url } from 'lib/compression';

type CourseInfo = {
  onDownloadImage: () => void;
};

export const CourseInfo = ({ onDownloadImage }: CourseInfo) => {
  const [course, setCourse] = useAtom(courseAtom.course);
  const [courses, setCourses] = useAtom(courseAtom.courses);
  const isStudent = useAtomValue(courseAtom.previewMode) === 'student';

  const saveCourse = () => {
    const now = new Date().toISOString();
    const currentCourse = courses.find((c) => c.id === course.id);

    if (currentCourse) {
      const updatedCourse = {
        ...course,
        updatedAt: now,
        fav: !course.fav,
      };
      setCourse(updatedCourse);
      const updatedCourses = [...courses.filter((c) => c.id !== course.id), updatedCourse];
      setCourses(updatedCourses);
      return;
    }
  };

  const shareCourse = () => {
    const module1 = course.modules[0];
    const lesson1 = module1.lessons[0];

    const minifyCourse = {
      t: course.title,
      d: course.description || undefined,
      f: course.fav,
      c: course.category || 'outros',
      l: course.level || 'beginner',
      m: {
        t: module1.name || 'Módulo 1',
        l: {
          t: lesson1.title || 'Aula 1',
          u: lesson1.videoUrl || undefined,
          d: lesson1.description || undefined,
          h: lesson1.duration || '00:00',
        },
      },
    };

    if (!minifyCourse) {
      toast.error('Curso inválido para compartilhar.', {
        style: { background: '#121212', color: 'red' },
      });
      return;
    }

    const compressed = compressToBase64Url(minifyCourse);
    const url = `${window.location.origin}/preview?data=${compressed}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Link do curso copiado!', {
          style: { background: '#121212', color: 'green' },
        });
      })
      .catch(() => {
        toast.error('Erro ao copiar o link.', {
          style: { background: '#121212', color: 'red' },
        });
      });
  };

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex w-full gap-4 sm:w-fit items-center">
            <div className="size-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-4xl">
              {getCategoryIcon(course.category)}
            </div>
            <Badge
              className={`${
                course.published ? 'bg-green-500/90' : 'bg-yellow-500/90'
              } text-white border-0 h-fit px-4 py-2 sm:hidden ml-auto`}
            >
              {course.published ? 'Publicado' : 'Rascunho'}
            </Badge>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0">{course.title}</h1>
                <p className="text-white/70 text-lg leading-relaxed">{course.description}</p>
              </div>
              {!isStudent && (
                <Badge
                  className={`${
                    course.published ? 'bg-green-500/90' : 'bg-yellow-500/90'
                  } text-white border-0 px-4 py-2 hidden sm:flex`}
                >
                  {course.published ? 'Publicado' : 'Rascunho'}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Badge variant="outline" className="bg-blue-500/20 border-blue-500/40 text-blue-300 px-4 py-2">
                {getCategoryLabel(course.category)}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-500/20 border-purple-500/40 text-purple-300 px-4 py-2"
              >
                {getLevelLabel(course.level)}
              </Badge>
              <div className="flex items-center gap-2 text-white/60">
                <BookOpen className="size-4" />
                <span>{getTotalLessons(course)} aulas</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="size-4" />
                <span>{getTotalDuration(course)}</span>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6"
                onClick={saveCourse}
              >
                <Heart
                  className="size-4 mr-2"
                  color={course.fav ? 'red' : 'white'}
                  fill={course.fav ? 'red' : 'transparent'}
                />
                Favoritar
              </Button>
              <Button
                onClick={shareCourse}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Share2 className="size-4 mr-2" />
                Compartilhar
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={onDownloadImage}
              >
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
