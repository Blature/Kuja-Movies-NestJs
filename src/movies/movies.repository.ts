import { EntityRepository, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
import { MovieStatus } from './movies.-status.enum';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async getMovies(filterDto: MovieFilterDto): Promise<Movie[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('movie');

    if (status) {
      query.andWhere('movie.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER (movie.name) LIKE LOWER(:search) OR LOWER (movie.description) LIKE LOWER (:search) OR LOWER (movie.genre) LIKE LOWER (:search))',
        { search: `%${search}%` },
      );
    }
    const movies = await query.getMany();
    return movies;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { name, description, genre } = createMovieDto;
    const movie = this.create({
      name,
      description,
      genre,
      status: MovieStatus.WATCHING,
      date: Date(),
    });
    await this.save(movie);
    return movie;
  }
}
