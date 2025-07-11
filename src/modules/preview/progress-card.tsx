'use client';

import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { getTotalLessons } from '@utils/get';

export const ProgressCard = () => {
  const course = useAtomValue(courseAtom.course);

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Concluído</span>
              <span>0%</span>
            </div>
            <Progress value={0} className="h-2 bg-white/10" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0/{getTotalLessons(course)}</p>
            <p className="text-white/60 text-sm">aulas assistidas</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
