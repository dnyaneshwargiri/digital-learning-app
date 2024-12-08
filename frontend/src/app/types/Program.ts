export type Program = {
  id: number;
  title: string;
  content: string;
  modules: Array<Module>;
};

export type Module = {
  id: number;
  title: string;
  description: string;
};
