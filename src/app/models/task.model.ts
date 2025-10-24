export interface Task {
  id: number;
  userId: number;
  title: string;
  taskDesc: string;
  category: number;
  priority: string;
  status: string;
  imageURL: string;
  dueDate: Date;
}
