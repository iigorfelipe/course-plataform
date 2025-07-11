'use client';

import { Play, BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@components/ui/collapsible';
import { useAtom, useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { getTotalLessons } from '@utils/get';

export const CourseContent = () => {
  const course = useAtomValue(courseAtom.course);

  const [openModules, setOpenModules] = useAtom(courseAtom.openModules);
  const [selectedLesson, setSelectedLesson] = useAtom(courseAtom.selectedLesson);

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId],
    );
  };

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="size-5" />
          Conteúdo do Curso
        </CardTitle>
        <CardDescription className="text-white/60">
          {course.modules.length} módulos • {getTotalLessons(course)} aulas
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        {course.modules.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <BookOpen className="size-12 mx-auto mb-4 opacity-40" />
            <p>Nenhum módulo adicionado</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id}>
                <Collapsible
                  open={openModules.includes(module.id)}
                  onOpenChange={() => toggleModule(module.id)}
                >
                  <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {moduleIndex + 1}
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-white text-sm">
                          {module.name || `Módulo ${moduleIndex + 1}`}
                        </h4>
                        <p className="text-xs text-white/60">{module.lessons.length} aulas</p>
                      </div>
                    </div>
                    {openModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-2 space-y-1">
                      {module.lessons.length === 0 ? (
                        <p className="text-white/40 text-xs py-2">Nenhuma aula</p>
                      ) : (
                        module.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson.id)}
                            className={`w-full text-left p-2 rounded-lg transition-colors text-sm ${
                              selectedLesson === lesson.id
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'hover:bg-white/5 text-white/70'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Play className="w-3 h-3" />
                              <span className="flex-1 truncate">
                                {lesson.title || `Aula ${lessonIndex + 1}`}
                              </span>
                              <span className="text-xs text-white/40">{lesson.duration}</span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
