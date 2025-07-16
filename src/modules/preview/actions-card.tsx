'use client';

import Link from 'next/link';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';

export const ActionsCard = () => {
  const course = useAtomValue(courseAtom.course);

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <CardTitle className="text-white">Ações</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Link href={`/course/${course.id}/edit`} className="w-full">
          <Button className="text-white w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Editar Curso
          </Button>
        </Link>

        <Button
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          disabled
        >
          Modo Aluno
        </Button>

        <Button
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          disabled
        >
          Relatórios
        </Button>
      </CardContent>
    </Card>
  );
};
