import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { UpdateMovieStatus } from './dto/update-movie-status.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './dto/file-name.dto';

@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {
  private logger = new Logger('MoviesController');
  constructor(private moviesService: MoviesService) {}

  @Get()
  getMovies(
    @Query() filterDto: MovieFilterDto,
    @GetUser() user: User,
  ): Promise<Movie[]> {
    this.logger.verbose(
      `User "${
        user.username
      }" retrieving all tasks!, Filters are ${JSON.stringify(filterDto)}`,
    );
    return this.moviesService.getMovies(filterDto, user);
  }
  @Post()
  createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: User,
  ): Promise<Movie> {
    this.logger.verbose(
      `User with "${user.username}" Username is created ${JSON.stringify(
        createMovieDto.name,
      )}`,
    );
    return this.moviesService.createMovie(createMovieDto, user);
  }
  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }
  @Get('/:id')
  getMovieById(@Param('id') id: string, @GetUser() user: User): Promise<Movie> {
    return this.moviesService.getMovieById(id, user);
  }
  @Delete('/:id')
  deleteMovie(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.moviesService.deleteMovie(id, user);
  }
  @Patch('/:id/status')
  updateMovie(
    @Param('id') id: string,
    @Body() updateMovieStatus: UpdateMovieStatus,
    @GetUser() user: User,
  ): Promise<Movie> {
    const { status } = updateMovieStatus;
    return this.moviesService.updateMovie(id, status, user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', {storage:diskStorage({
    destination: './uploads',
    filename: editFileName,
  })}))
  async uploadSingle(@UploadedFile() file){
    const response = {
    	originalname: file.originalname,
    	filename: file.filename,
    };
    return response;
  }

}
