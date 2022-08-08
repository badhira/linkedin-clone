import { FeedPostEntity } from 'src/feed/models/post.entity';
import { Role } from './role.enum';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    feedPosts: FeedPostEntity[];
}
