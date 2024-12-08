export interface Program {
  id: number;
  title: string;
  description: string;
  modules: Array<{ title: string; description: string }>;
}
