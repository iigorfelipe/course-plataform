'use client';

import { ArrowLeft, Upload, BookOpen } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { useAtom, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { ChangeEvent } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';

type BasicInformationStep = {
  type: 'new' | 'edit';
};

export const BasicInformationStep = ({ type = 'new' }: BasicInformationStep) => {
  const [course, setCourse] = useAtom(courseAtom.course);
  const setCurrentStep = useSetAtom(courseAtom.currentStep);

  const subTitle =
    type === 'new'
      ? 'Vamos começar com as informações básicas do seu curso'
      : ' Atualize as informações básicas do seu curso';

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourse((prev) => ({ ...prev, thumbnail: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setCourse((prev) => ({ ...prev, title: e.target.value }));
  };

  const onChangeInputDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCourse((prev) => ({ ...prev, description: e.target.value }));
  };

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="text-center pb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-blue-400" />
        </div>
        <CardTitle className="text-2xl text-white">Informações do Curso</CardTitle>
        <CardDescription className="text-white/60">{subTitle}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-white font-medium">
            Título do Curso *
          </Label>
          <Input
            id="title"
            placeholder="Ex: Curso Completo de React para Iniciantes"
            value={course.title}
            onChange={onChangeInputTitle}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 h-12 text-lg placeholder:text-sm"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-white font-medium">
            Descrição
          </Label>
          <Textarea
            id="description"
            placeholder="Descreva o que os alunos vão aprender neste curso..."
            value={course.description}
            onChange={onChangeInputDescription}
            className="placeholder:text-sm bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 min-h-[120px] resize-none"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-white font-medium">Thumbnail do Curso</Label>
          <div className="flex items-center gap-6">
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('thumbnail')?.click()}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            >
              <Upload className="w-4 h-4 mr-2" />
              Escolher Imagem
            </Button>
            {course.thumbnail && (
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.thumbnail || '/placeholder.svg'}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Tooltip>
            <TooltipTrigger
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 h-9 py-2 has-[>svg]:px-3 whitespace-nowrap rounded-md text-sm font-medium transition-all text-primary-foreground shadow-xs"
              disabled={course.title.trim().length === 0}
            >
              Próximo
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </TooltipTrigger>
            {course.title.trim().length === 0 && (
              <TooltipContent>
                <p>Adiciona um Título ao Curso para navegar</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
