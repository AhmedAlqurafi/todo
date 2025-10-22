export interface Task {
  id: number;
  userId: number;
  title: string;
  taskDesc: string;
  category: number;
  priority: string;
  imageURL: string;
  dueDate: Date;
}
