'use client';

import { BookOpen, Settings, Users } from 'lucide-react';
import { useAtom, useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip';

export const ProgressSteps = () => {
  const [currentStep, setCurrentStep] = useAtom(courseAtom.currentStep);
  const course = useAtomValue(courseAtom.course);

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: BookOpen },
    { id: 2, title: 'Configurações', icon: Settings },
    { id: 3, title: 'Conteúdo', icon: Users },
  ];

  return (
    <div className="flex justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <Tooltip>
            <TooltipTrigger
              disabled={course.title.trim().length === 0}
              onClick={() => setCurrentStep(step.id)}
              className={`flex flex-col sm:flex-row text-center items-center sm:gap-3 px-4 py-2 h-16 justify-center sm:h-fit rounded-full transition-all duration-300 ${
                currentStep >= step.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <step.icon className="size-4 sm:size-5" />
              <span className="font-medium text-xs sm:text-base">{step.title}</span>
            </TooltipTrigger>
            {currentStep !== step.id && course.title.trim().length === 0 && (
              <TooltipContent className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <p>Adiciona um Título ao Curso para navegar</p>
              </TooltipContent>
            )}
          </Tooltip>
          {index < steps.length - 1 && (
            <div
              className={`w-2 sm:w-8 h-0.5 sm:mx-2 transition-colors duration-300 ${
                currentStep > step.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
