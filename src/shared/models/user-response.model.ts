import { User } from '../../../src/user/shared/entities/user.entity';

export class UserResponse {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(user: User) {
    if (user) {
      const { id, email, firstName, lastName, createdAt, updatedAt }: User =
        user;
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
}
