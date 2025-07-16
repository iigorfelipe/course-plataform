'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { modalAtom } from '@store/modals';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@components/ui/dialog';
import { toast } from 'sonner';

export const DeleteCourseModal = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const course = useAtomValue(courseAtom.course);
  const [courses, setCourses] = useAtom(courseAtom.courses);
  const onClose = useSetAtom(modalAtom.closeDeleteCourseModal);
  const isOpenDeleteCourseModal = useAtomValue(modalAtom.isOpenDeleteCourseModal);

  const deleteCourse = () => {
    const updatedCourses = courses.filter(({ id }) => course.id !== id);
    setCourses(updatedCourses);
  };

  const handleDelete = async () => {
    if (confirmText !== course.title) return;

    setIsDeleting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    deleteCourse();
    setIsDeleting(false);
    setConfirmText('');

    toast.success('Curso excluído!', {
      style: {
        background: '#121212',
        color: 'green',
      },
    });

    onClose();
  };

  const handleClose = () => {
    if (isDeleting) return;
    setConfirmText('');
    onClose();
  };

  const isConfirmValid = confirmText === course.title;

  return (
    <Dialog open={isOpenDeleteCourseModal} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={false}
        className="w-full h-full sm:max-h-[98%] overflow-auto sm:max-w-md bg-slate-900/95 backdrop-blur-xl border border-red-500/20 rounded-2xl sm:rounded-2xl shadow-2xl animate-slide-up pb-4 custom-scrollbar"
      >
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-white/10 space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white">Excluir Curso</DialogTitle>
              <DialogDescription className="text-sm text-white/60">
                Esta ação não pode ser desfeita
              </DialogDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isDeleting}
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <X className="size-4" />
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-6 ">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-4">
              {course.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={course.thumbnail || '/placeholder.svg'}
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-8 h-8 text-red-400" />
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="font-semibold text-white line-clamp-2">{course.title}</h3>
                <p className="text-sm text-white/60 line-clamp-2 mt-1">{course.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                  <span>{course.modules.length} módulos</span>
                  <span>•</span>
                  <span>{course.published ? 'Publicado' : 'Rascunho'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-red-300">Atenção!</h4>
                <ul className="text-sm text-red-200/80 space-y-1">
                  <li>• O curso será permanentemente excluído</li>
                  <li>• Todos os módulos e aulas serão perdidos</li>
                  <li>• Esta ação não pode ser desfeita</li>
                  <li>• Os dados não poderão ser recuperados</li>
                  <li>• Alunos matriculados perderão acesso</li>
                  <li>• Estatísticas e progresso serão apagados</li>
                </ul>
              </div>
            </div>
          </div>

          {course.published && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-300">Curso Publicado!</h4>
                  <p className="text-sm text-orange-200/80">
                    Este curso está publicado e pode ter alunos ativos. A exclusão afetará todos os usuários
                    matriculados.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-white font-medium">Para confirmar, digite o nome do curso:</Label>
            <div className="space-y-2">
              <div className="text-sm text-white/60 bg-white/5 rounded-lg p-3 border border-white/10">
                <code className="text-blue-300 break-all">{course.title}</code>
              </div>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Digite o nome do curso aqui..."
                disabled={isDeleting}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-red-400"
              />
              {confirmText && confirmText !== course.title && (
                <p className="text-xs text-red-400">
                  O nome não confere. Digite exatamente como mostrado acima.
                </p>
              )}
              {isConfirmValid && (
                <p className="text-xs text-green-400">
                  ✓ Nome confirmado. Você pode prosseguir com a exclusão.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="font-medium text-white mb-3">Dados que serão perdidos:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-lg font-bold text-red-400">{course.modules.length}</p>
                <p className="text-white/60">Módulos</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-lg font-bold text-red-400">
                  {course.modules.reduce((acc, module) => acc + (module.lessons?.length || 0), 0)}
                </p>
                <p className="text-white/60">Aulas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-white/10 flex-shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            disabled={!isConfirmValid || isDeleting}
            className={`flex-1 ${
              isConfirmValid
                ? 'text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                : 'bg-red-500/20 text-red-300'
            } transition-all duration-300`}
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Curso
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
