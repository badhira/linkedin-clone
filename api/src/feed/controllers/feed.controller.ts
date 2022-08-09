import { Delete, Query, Request, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
  feedPostRepository: any;
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }
  // @Get()
  // findAll(): Observable<FeedPost[]> {
  //   return this.feedService.findAllPosts();
  // }
  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<FeedPost[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }
  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
