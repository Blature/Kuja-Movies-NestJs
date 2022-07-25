import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  private logger = new Logger('MoviesRepository');

  async getMovies(filterDto: MovieFilterDto, user: User): Promise<Movie[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('movie');

    query.where({ user });

    if (status) {
      query.andWhere('movie.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER (movie.name) LIKE LOWER(:search) OR LOWER (movie.description) LIKE LOWER (:search) OR LOWER (movie.genre) LIKE LOWER (:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const movies = await query.getMany();
      return movies;
    } catch (err) {
      this.logger.error(
        `Failed to get Movies for user "${
          user.username
        }" with Filter ${JSON.stringify(filterDto)}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<Movie> {
    const { name, description, genre } = createMovieDto;
    const movie = this.create({
      name,
      description,
      genre,
      status: MovieStatus.WATCHING,
      date: Date(),
      user,
    });
    await this.save(movie);
    return movie;
  }
}
