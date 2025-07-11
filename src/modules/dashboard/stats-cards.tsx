'use client';

import { BookOpen, TrendingUp, Play, Award } from 'lucide-react';
import { Card, CardContent } from '@components/ui/card';
import { useAtomValue } from 'jotai';
import { getTotalLessons } from '@utils/get';
import { courseAtom } from '@store/course';

export const StatsCards = () => {
  const courses = useAtomValue(courseAtom.courses);
  const isLoaded = useAtomValue(courseAtom.isLoaded);

  return (
    /* Stats Cards */
    <div
      className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
      style={{ animationDelay: '0.2s' }}
    >
      <Card className="glass-effect border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-white/60 text-sm">Cursos Criados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Play className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {courses.reduce((acc, course) => acc + getTotalLessons(course), 0)}
              </p>
              <p className="text-white/60 text-sm">Total de Aulas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courses.filter((c) => c.published).length}</p>
              <p className="text-white/60 text-sm">Publicados</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courses.filter((c) => !c.published).length}</p>
              <p className="text-white/60 text-sm">Rascunhos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
