import Link from 'next/link';
import { Button } from '@components/ui/button';

export const NotFoundCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Curso não encontrado</h2>
        <p className="text-white/60 mb-6">O curso que você está procurando não existe</p>
        <Link href="/">
          <Button className="bg-gradient-to-r text-white from-blue-600 to-purple-600">
            Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
