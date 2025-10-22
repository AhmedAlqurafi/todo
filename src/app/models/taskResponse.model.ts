export interface TaskResponse {
  id: number;
  userId: number;
  title: string;
  categoryId: number;
  priorityId: number;
  details: string;
  statusId: number;
  imageURL: string;
  deadline: Date;
}
