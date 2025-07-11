import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@components/ui/button';

type CourseHeader = {
  type: 'edit' | 'new';
};

export const CourseHeader = ({ type = 'new' }: CourseHeader) => {
  const title = type === 'new' ? 'Criar Novo' : 'Editar';
  const subTitle = type === 'new' ? 'Transforme seu conhecimento em um' : 'Atualize as informações do seu';

  return (
    <div className="flex flex-col animate-slide-up mb-2">
      <Link href="/">
        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 gap-2">
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </Link>
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl font-bold text-white">{title} Curso</h1>
        <p className="text-white/60">{subTitle} curso extraordinário</p>
      </div>
    </div>
  );
};
