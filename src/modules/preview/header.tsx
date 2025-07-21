import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';

export const HeaderPreview = () => {
  const isStudent = useAtomValue(courseAtom.previewMode) === 'student';
  const course = useAtomValue(courseAtom.course);

  return (
    <div className="flex flex-col mb-8 animate-slide-up">
      <Link href="/">
        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </Link>
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl font-bold text-white">{isStudent ? course.title : 'Preview do Curso'}</h1>
        {!isStudent && <p className="text-white/60">Visualize como seu curso aparecerá para os alunos</p>}
      </div>
    </div>
  );
};
