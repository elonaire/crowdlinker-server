import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import {BlogPostDto} from './blog.entity';
import {BlogService} from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('')
  fetchBlogPosts(): Promise<BlogPostDto[]> {
    return this.blogService.fetchBlogPosts();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post('')
  createBlogPost(@Body() post: BlogPostDto): Promise<BlogPostDto> {
    return this.blogService.createBlogPost(post);
  }
}
