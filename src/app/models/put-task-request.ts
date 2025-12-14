export interface PutTaskRequest {
      Title: string;
  Details: string;
  CategoryId: number;
  PriorityId: any;
  StatusId: number;
  Deadline: Date;
  ImageURL: string;
}