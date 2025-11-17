import { Task } from '../models/task.model';
import { TaskResponse } from '../models/taskResponse.model';
import { PRIORITY_NUMBER_TO_NAME } from './priority';
import { STATUS_NUMBER_TO_NAME } from './status';

export const mapBackendTaskToFrontend = (backendTask: TaskResponse): Task => {
  const frontendTask: Task = {
    id: backendTask.id,
    userId: backendTask.userId,
    title: backendTask.title,
    taskDesc: backendTask.details,
    dueDate: new Date(backendTask.deadline),
    createdAt: new Date(backendTask.createdAt),
    imageURL: backendTask.imageURL,
    category: backendTask.categoryId,
    priority: PRIORITY_NUMBER_TO_NAME.get(backendTask.priorityId)!,
    status: STATUS_NUMBER_TO_NAME.get(backendTask.statusId)!,
  };

  return frontendTask;
};
