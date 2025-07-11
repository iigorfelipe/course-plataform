'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, BookOpen, Users, Save } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import type { Course, Lesson, Module } from '@contracts/course';
import { useAtom, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { formatTime } from 'utils/format';

type ContentStep = {
  type: 'new' | 'edit';
};

export const ContentStep = ({ type = 'new' }: ContentStep) => {
  const router = useRouter();
  const [newCourseAtom, setNewCourseAtom] = useAtom(courseAtom.course);
  const setCurrentStep = useSetAtom(courseAtom.currentStep);

  const saveButton = type === 'new' ? 'Curso' : 'Alterações';

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      name: '',
      lessons: [],
    };
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: [...(prev.modules || []), newModule],
    }));
  };

  const updateModule = (moduleId: string, name: string) => {
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) => (module.id === moduleId ? { ...module, name } : module)),
    }));
  };

  const removeModule = (moduleId: string) => {
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: prev.modules?.filter((module) => module.id !== moduleId),
    }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      videoUrl: '',
      duration: '00:00',
      description: '',
    };
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    }));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setNewCourseAtom((prev) => ({
      ...prev,
      modules: prev.modules?.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    }));
  };

  const saveCourse = () => {
    const now = new Date().toISOString();
    const existingCourses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]');

    let updatedCourses: Course[] = [];

    if (type === 'new') {
      const newCourse: Course = {
        id: Date.now().toString(),
        title: newCourseAtom.title,
        description: newCourseAtom.description || '',
        thumbnail: newCourseAtom.thumbnail,
        category: newCourseAtom.category || '',
        level: newCourseAtom.level || 'beginner',
        published: newCourseAtom.published || false,
        modules: newCourseAtom.modules || [],
        createdAt: now,
        updatedAt: now,
      };

      updatedCourses = [...existingCourses, newCourse];
    }

    if (type === 'edit') {
      const updatedCourse: Course = {
        ...newCourseAtom,
        updatedAt: now,
      };

      updatedCourses = existingCourses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    }

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    router.push('/');
  };

  return (
    <Card className="glass-effect border-white/20 animate-slide-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
              <Users className="size-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl text-white">Conteúdo do Curso</CardTitle>
              <CardDescription className="text-white/60">
                Organize módulos e aulas do seu curso
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {newCourseAtom.modules?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="size-12 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhum módulo ainda</h3>
            <p className="text-white/60 mb-6">Comece adicionando o primeiro módulo do seu curso</p>
            <Button
              onClick={addModule}
              className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="size-4 " />
              Adicionar Primeiro Módulo
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {newCourseAtom.modules?.map((module, moduleIndex) => (
              <div key={module.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  <div className="flex gap-2 w-full items-center">
                    <div className="px-3 py-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {moduleIndex + 1}
                    </div>
                    <Input
                      placeholder={`Nome do Módulo ${moduleIndex + 1}`}
                      value={module.name}
                      onChange={(e) => updateModule(module.id, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-lg font-medium placeholder:text-sm"
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeModule(module.id)}
                      className="bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addLesson(module.id)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Plus className="size-4" />
                    Nova Aula
                  </Button>
                </div>

                {module.lessons.length > 0 && (
                  <div className="space-y-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex flex-col sm:flex-row w-full gap-4 mb-3">
                          <div className="flex items-center gap-2 w-full">
                            <Input
                              placeholder={`Título da Aula ${lessonIndex + 1}`}
                              value={lesson.title}
                              onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                              className="bg-white/10 w-[100%] border-white/20 text-white placeholder:text-white/40"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeLesson(module.id, lesson.id)}
                              className="bg-red-500/20 sm:hidden w-fit border-red-500/40 text-red-300 hover:bg-red-500/30"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                          <div className="flex gap-2 items-center">
                            <Input
                              placeholder="hh:mm"
                              value={lesson.duration}
                              onChange={(e) => {
                                const formatted = formatTime(e.target.value);
                                if (formatted.length <= 5) {
                                  updateLesson(module.id, lesson.id, 'duration', formatted);
                                }
                              }}
                              className="bg-white/10 text-center sm:text-start sm:w-16 border-white/20 text-white placeholder:text-white/40"
                            />

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeLesson(module.id, lesson.id)}
                              className="bg-red-500/20 hidden sm:flex border-red-500/40 text-red-300 hover:bg-red-500/30"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                        <Input
                          placeholder="Link do vídeo (YouTube)"
                          value={lesson.videoUrl}
                          onChange={(e) => updateLesson(module.id, lesson.id, 'videoUrl', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 mb-3"
                        />
                        <Textarea
                          placeholder="Descrição da aula"
                          value={lesson.description}
                          onChange={(e) => updateLesson(module.id, lesson.id, 'description', e.target.value)}
                          rows={2}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {newCourseAtom.modules?.length > 0 && (
          <Button
            onClick={addModule}
            className=" text-white bg-gradient-to-r w-full mt-8 from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Plus className="size-4 " />
            Novo Módulo
          </Button>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(2)}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="size-4 " />
            Anterior
          </Button>
          {newCourseAtom.modules?.length > 0 && (
            <div className="flex gap-4">
              <Button
                onClick={saveCourse}
                className="text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8"
              >
                <Save className="size-4 " />
                Salvar {saveButton}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
