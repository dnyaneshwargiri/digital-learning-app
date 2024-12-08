export interface Program {
  id: number;
  title: string;
  content: string;
  modules: Array<{ title: string; description: string }>;
}
