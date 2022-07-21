import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieFilterDto } from './dto/get-movie-filter.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
  ) {}

  async getMovies(filterDto: MovieFilterDto): Promise<Movie[]> {
    return this.movieRepository.getMovies(filterDto);
  }

  createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto);
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  // getAllMovies(): Movie[] {
  //   return this.movies;
  // }

  // getMovieByFilter(movieDto: MovieFilterDto): Movie[] {
  //   const { status, search } = movieDto;
  //   let movies = this.getAllMovies();
  //   if (status) {
  //     movies = movies.filter((movie) => movie.status === status);
  //   }
  //   if (search) {
  //     movies = movies.filter((movie) => {
  //       if (movie.name.toLowerCase().includes(search) || movie.description.toLowerCase().includes(search) || movie.genre.toLowerCase().includes(search)) {
  //         return movies
  //       }
  //     });
  //     return movies

  //   }
  // }
  // getMovieById(id: string): Movie {
  //   return this.movies.find((movie) => movie.id === id);
  // }

  // createMovie(createMovieDto: CreateMovieDto): Movie {
  //   const { name, description, genre } = createMovieDto;
  //   const movie: Movie = {
  //     id: uuid(),
  //     name,
  //     description,
  //     genre,
  //     status: MovieStatus.WANT_TO_WATCH,
  //     date: Date(),
  //   };

  //   this.movies.push(movie);

  //   return movie;
  // }

  // deleteMovieById(id: string) {
  //   const findMovie = this.movies.find((movie) => movie.id === id);
  //   if (findMovie) {
  //     const index = this.movies.indexOf(findMovie);
  //     this.movies.splice(index, 1);
  //     return this.movies;
  //   } else return 'NOT FOUND !';
  // }

  // deleteAllMovies() {
  //   this.movies.splice(0, this.movies.length - 1);
  //   console.log(this.movies.length, this.movies.length - 1);
  //   return 'DONE ALL DELETED !';
  // }

  // updateMovieById(id: string, status: MovieStatus): Movie {
  //   const movie = this.getMovieById(id);
  //   movie.status = status;
  //   return movie;
  // }
}
