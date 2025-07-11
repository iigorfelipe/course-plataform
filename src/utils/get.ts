import type { Course } from '@contracts/course';

export const getTotalLessons = (course: Course) => {
  if (!course) return 0;
  return course.modules.reduce((total, module) => total + module.lessons.length, 0);
};

export const getTotalDuration = (course: Course) => {
  if (!course) return '0h 0m';

  let totalMinutes = 0;
  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      const duration = lesson.duration.split(':');
      totalMinutes += Number.parseInt(duration[0]) * 60 + Number.parseInt(duration[1]);
    });
  });
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export const getLevelColor = (level: string) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };
  return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const getCategoryIcon = (category: string) => {
  const icons = {
    programacao: '💻',
    design: '🎨',
    marketing: '📈',
    negocios: '💼',
    idiomas: '🌍',
    outros: '📚',
  };
  return icons[category as keyof typeof icons] || '📚';
};

export const getLevelLabel = (level: string) => {
  const levels = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };
  return levels[level as keyof typeof levels] || level;
};

export const getCategoryLabel = (category: string) => {
  const categories = {
    programacao: 'Programação',
    design: 'Design',
    marketing: 'Marketing',
    negocios: 'Negócios',
    idiomas: 'Idiomas',
    outros: 'Outros',
  };
  return categories[category as keyof typeof categories] || category;
};
