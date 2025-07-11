'use client';

import { ArrowLeft, Settings } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Checkbox } from '@components/ui/checkbox';
import { useAtom, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';

type SettingsStep = {
  type: 'new' | 'edit';
};

export const SettingsStep = ({ type = 'new' }: SettingsStep) => {
  const [newCourse, setNewCourse] = useAtom(courseAtom.course);
  const setCurrentStep = useSetAtom(courseAtom.currentStep);

  const subTitle = type === 'new' ? 'Configure' : 'Atualize';
  const courseStatus = type === 'new' ? 'Publicar curso imediatamente' : 'Curso publicado';
  const courseStatusDescription = type === 'new' ? 'O curso ficará' : 'O curso está';

  return (
    <Card className="glass-effect border-white/20 animate-slide-up">
      <CardHeader className="text-center pb-8">
        <div className="size-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings className="size-8 text-green-400" />
        </div>
        <CardTitle className="text-2xl text-white">Configurações</CardTitle>
        <CardDescription className="text-white/60">
          {subTitle} categoria, nível e status de publicação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-0">
          <div className="space-y-3">
            <Label className="text-white font-medium">Categoria</Label>
            <Select
              value={newCourse.category}
              onValueChange={(value) => setNewCourse((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-slate-400 border-white/20">
                <SelectItem value="programacao">💻 Programação</SelectItem>
                <SelectItem value="design">🎨 Design</SelectItem>
                <SelectItem value="marketing">📈 Marketing</SelectItem>
                <SelectItem value="negocios">💼 Negócios</SelectItem>
                <SelectItem value="idiomas">🌍 Idiomas</SelectItem>
                <SelectItem value="outros">📚 Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-white font-medium">Nível de Dificuldade</Label>
            <RadioGroup
              value={newCourse.level}
              onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') =>
                setNewCourse((prev) => ({ ...prev, level: value }))
              }
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="beginner" id="beginner" className="border-white/40" />
                <Label
                  htmlFor="beginner"
                  className="text-white cursor-pointer flex flex-col sm:flex-row items-start"
                >
                  <span className="font-medium">Iniciante</span>
                  <p className="text-sm text-white/60 ">Para quem está começando</p>
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="intermediate" id="intermediate" className="border-white/40" />
                <Label
                  htmlFor="intermediate"
                  className="text-white cursor-pointer flex flex-col sm:flex-row items-start"
                >
                  <span className="font-medium">Intermediário</span>
                  <p className="text-sm text-white/60">Já tem conhecimento básico</p>
                </Label>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <RadioGroupItem value="advanced" id="advanced" className="border-white/40" />
                <Label
                  htmlFor="advanced"
                  className="text-white cursor-pointer flex flex-col sm:flex-row items-start"
                >
                  <span className="font-medium">Avançado</span>
                  <p className="text-sm text-white/60">Para especialistas</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5">
          <Checkbox
            id="published"
            checked={newCourse.published}
            onCheckedChange={(checked) => setNewCourse((prev) => ({ ...prev, published: !!checked }))}
            className="border-white/40"
          />
          <Label
            htmlFor="published"
            className="text-white cursor-pointer flex flex-col sm:flex-row items-start"
          >
            <span className="font-medium">{courseStatus}</span>
            <p className="text-sm text-white/60">{courseStatusDescription} visível para os alunos</p>
          </Label>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(1)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
            disabled={newCourse.category.trim().length === 0}
          >
            Próximo
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
