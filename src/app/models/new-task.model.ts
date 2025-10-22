export interface NewTask {
  title: string;
  textDesc: string;
  dueDate: Date;
  imageURL: string;
  category: number;
  priority: 'High' | 'Medium' | 'Low';
}
