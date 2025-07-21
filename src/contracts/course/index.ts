export type Course = {
  id: string;
  title: string;
  description: string;
  fav: boolean;
  thumbnail?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  published: boolean;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
};

export type Module = {
  id: string;
  name: string;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  description: string;
};

export type MinifiedCourse = {
  t: string;
  d: string;
  f: boolean;
  c: string;
  l: 'beginner' | 'intermediate' | 'advanced';
  m: {
    t: string;
    l: {
      t: string;
      u: string;
      d: string;
      h: string;
    };
  };
};
