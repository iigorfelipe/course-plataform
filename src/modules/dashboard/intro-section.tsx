'use client';

import Link from 'next/link';
import { Plus, BookOpen, Users, Sparkles } from 'lucide-react';
import { Button } from '@components/ui/button';
import { useAtomValue } from 'jotai';
import { getTotalLessons } from '@utils/get';
import { courseAtom } from '@store/course';

export const IntroSection = () => {
  const courses = useAtomValue(courseAtom.courses);
  const isLoaded = useAtomValue(courseAtom.isLoaded);

  return (
    <div className={`text-center mb-16 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
        <Sparkles className="w-4 h-4 text-yellow-400" />
        <span className="text-white/90 text-sm font-medium">Plataforma de Criação de Cursos</span>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
        <span className="gradient-text">Seus Cursos</span>
        <br />
        <span className="text-white">Extraordinários</span>
      </h1>

      <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
        Crie, gerencie e compartilhe cursos online incríveis com nossa plataforma intuitiva e moderna
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/course/new">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-7 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 animate-pulse-glow hover:scale-105"
          >
            <Plus className="size-6" />
            Criar Novo Curso
          </Button>
        </Link>

        {courses.length > 0 && (
          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>{courses.length} cursos</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{courses.reduce((acc, course) => acc + getTotalLessons(course), 0)} aulas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
