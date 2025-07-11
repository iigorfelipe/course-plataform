'use client';

import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';

export const EmpetyCourses = () => {
  const isLoaded = useAtomValue(courseAtom.isLoaded);

  return (
    <Card
      className={`glass-effect border-white/20 text-center py-20 ${
        isLoaded ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: '0.4s' }}
    >
      <CardContent>
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white/60" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Comece sua jornada</h3>
        <p className="text-white/60 mb-8 text-lg max-w-md mx-auto">
          Crie seu primeiro curso e compartilhe seu conhecimento com o mundo
        </p>
        <Link href="/course/new">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl">
            <Plus className="w-5 h-5 mr-2" />
            Criar Primeiro Curso
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
