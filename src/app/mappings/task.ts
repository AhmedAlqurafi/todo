import { TaskResponse } from "../models/taskResponse.model"

export const mapBackendTaskToFrontend = (backendTask: TaskResponse) => {
    const frontendTask = {
        id: backendTask.id,
        title: backendTask.title,
        textDesc: backendTask.details,
        dueDate: backendTask.deadline,
        
    }
}