import { UserResponse } from './user-response.model';

export interface JwtPayload {
  readonly profile: UserResponse;
}
