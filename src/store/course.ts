import type { Course } from '@contracts/course';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const emptyCourse: Partial<Course> = {
  title: '',
  description: '',
  category: 'outros',
  level: 'beginner',
  fav: false,
  published: false,
  modules: [],
};

const courses = atomWithStorage<Course[]>('courses', []);
const course = atom<Course>(emptyCourse as Course);
const isLoaded = atom<boolean>(false);
const openModules = atom<string[]>([]);
const currentStep = atom<number>(1);
const selectedLesson = atom<string | null>(null);

export const courseAtom = {
  courses,
  isLoaded,
  currentStep,
  course,
  openModules,
  selectedLesson,
};
