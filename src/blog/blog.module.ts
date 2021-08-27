import { Module } from '@nestjs/common';
import { usersProviders } from '../users/user.providers';
import { BlogController } from './blog.controller';
import { blogProviders } from './blog.providers';
import { BlogService } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, ...blogProviders, ...usersProviders]
})
export class BlogModule {}
