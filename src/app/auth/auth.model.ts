import { User } from '../models/user.model';

export interface AuthResponse {
  errorMessages: string[];
  isSuccess: boolean;
  result: {
    token: string;
    user: User;
  };
  statusCode: number;
}
