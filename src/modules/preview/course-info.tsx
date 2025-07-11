'use client';

import { Clock, BookOpen, Download, Share2, Heart } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import {
  getCategoryIcon,
  getCategoryLabel,
  getLevelLabel,
  getTotalDuration,
  getTotalLessons,
} from '@utils/get';

export const CourseInfo = () => {
  const course = useAtomValue(courseAtom.course);

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
              <Badge
                className={`${
                  course.published ? 'bg-green-500/90' : 'bg-yellow-500/90'
                } text-white border-0 px-4 py-2 hidden sm:flex`}
              >
                {course.published ? 'Publicado' : 'Rascunho'}
              </Badge>
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
                <BookOpen className="w-4 h-4" />
                <span>{getTotalLessons(course)} aulas</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span>{getTotalDuration(course)}</span>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6">
                <Heart className="w-4 h-4 mr-2" />
                Favoritar
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
