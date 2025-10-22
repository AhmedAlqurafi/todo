export interface TaskRequest {
  Title: string;
  Details: string;
  CategoryId: number;
  PriorityId: any;
  Deadline: Date;
  ImageURL: string;
}
