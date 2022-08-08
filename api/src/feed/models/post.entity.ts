/* eslint-disable prettier/prettier */
import { Column, 
  CreateDateColumn,
   Entity, 
   ManyToOne, 
   PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from 'src/auth/models/user.entity';

@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.feedPosts)
  author: UserEntity;
}
