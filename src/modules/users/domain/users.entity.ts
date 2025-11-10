export interface UserProps {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type NewUserProps = Omit<UserProps, 'id'>;

export class UserEntity {
  private props: UserProps;
  constructor(props: UserProps) {
    this.props = props;
  }

  static create(input: NewUserProps): UserEntity {
    return new UserEntity({
      ...input,
      id: undefined as unknown as number,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  static fromPersistence(props: NewUserProps): UserEntity {
    return new UserEntity(props);
  }
  get data() {
    return this.props;
  }
}
