export type TaskStatus = 'não iniciado' | 'em andamento' | 'concluído';

export interface Task {
  id: string;
  title: string;
  userId: string;
  status: TaskStatus;
}
