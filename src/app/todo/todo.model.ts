export interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  image?: string;
  priority: 'critical' | 'high' | 'moderate' | 'low';
  status: 'not started' | 'in progress' | 'completed';
}
