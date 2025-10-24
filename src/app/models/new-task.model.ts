export interface NewTask {
  title: string;
  taskDesc: string;
  dueDate: Date;
  imageURL: string;
  category: number;
  priority: 'High' | 'Medium' | 'Low';
}
