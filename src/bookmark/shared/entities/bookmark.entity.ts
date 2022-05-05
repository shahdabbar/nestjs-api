import { User } from '../../../user/shared/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity('Bookmark')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'NULL' })
  description: string;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.bookmarks, { eager: true })
  public user: User;

  @Column()
  public userId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;
}
