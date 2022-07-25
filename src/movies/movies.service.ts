import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
  ) {}

  async getMovies(filterDto: MovieFilterDto, user: User): Promise<Movie[]> {
    return this.movieRepository.getMovies(filterDto, user);
  }

  createMovie(createMovieDto: CreateMovieDto, user: User): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto, user);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async getMovieById(id: string, user: User): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id, user } });
    if (!movie) throw new NotFoundException(`We cant find Movie with ${id}`);

    return movie;
  }

  async deleteMovie(id: string, user: User): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id, user } });
    if (!movie) throw new NotFoundException(`We cant find Movie with ${id}`);
    await this.movieRepository.delete({ id, user });
  }

  async updateMovie(
    id: string,
    status: MovieStatus,
    user: User,
  ): Promise<Movie> {
    const movie = await this.getMovieById(id, user);
    movie.status = status;
    return await this.movieRepository.save(movie);
  }
}
