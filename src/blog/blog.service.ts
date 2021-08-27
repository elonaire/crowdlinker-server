import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from '../users/user.entity';
import {BLOG_REPOSITORY, USERS_REPOSITORY} from '../constants';
import {BlogPost, BlogPostDto} from './blog.entity';
import { v4 as uuidGenerator } from 'uuid';

@Injectable()
export class BlogService {
  constructor(
    @Inject(BLOG_REPOSITORY) private blogRepository: typeof BlogPost,
    @Inject(USERS_REPOSITORY) private usersRepository: typeof User
  ) {}

  async fetchBlogPosts(): Promise<BlogPost[]> {
    return this.blogRepository.findAll<BlogPost>();
  }

  async createBlogPost(post: BlogPostDto): Promise<BlogPost> {
    const user = await this.usersRepository.findOne<User>({
      where: {user_id: post.user_id},
    });

    if (!user) {
      throw new HttpException(
        'You are not allowed to perform this action.',
        HttpStatus.FORBIDDEN
      );
    }

    post.post_id = uuidGenerator();
    return this.blogRepository.create(post);
  }
}
