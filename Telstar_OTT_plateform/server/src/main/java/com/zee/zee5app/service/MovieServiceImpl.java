package com.zee.zee5app.service;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

import javax.naming.InvalidNameException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zee.zee5app.dto.Movie;
import com.zee.zee5app.exceptions.InvalidIdException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.repo.MovieRepository;
import com.zee.zee5app.utils.ImageUtility;

@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieRepository movieRepository; // Interface ref = class object()

	@Override
	public Movie insertMovie(Movie movie) throws UnableToGenerateIdException, FileNotFoundException {
		// TODO Auto-generated method stub
		return movieRepository.save(movie);
	}

	@Override
	public Optional<Movie> updateMovie(String movieId, Movie movie) throws NoDataFoundException {
		// TODO Auto-generated method stub
		if(movieRepository.existsById(movieId)) {
			Movie m = movieRepository.findById(movieId).get();
//			System.out.println(m);
			m.setActors(movie.getActors());
			m.setDirector(movie.getDirector());
			m.setGenre(movie.getGenre());
			m.setLanguages(movie.getLanguages());
			m.setMovieLength(movie.getMovieLength());
			m.setMovieName(movie.getMovieName());
			m.setProduction(movie.getProduction());
			m.setTrailer1(movie.getTrailer1());
			movieRepository.save(m);
			
			return Optional.ofNullable(movie);
		}else {
			throw new NoDataFoundException("Movie not exist");
		}
	}

	@Override
	public Optional<Movie> getMovieByMovieId(String movieId) throws InvalidNameException, InvalidIdException {
		// TODO Auto-generated method stub
		return movieRepository.findById(movieId);
	}

	@Override
	public Optional<List<Movie>> getAllMovies() throws InvalidNameException, InvalidIdException {
		return Optional.ofNullable(movieRepository.findAll());
	}

	@Override
	public Optional<List<Movie>> getAllMoviesByGenre(String genre)
			throws InvalidNameException, InvalidIdException, NoDataFoundException {
		return Optional.ofNullable(movieRepository.findAllByGenre(genre));
	}

	@Override
	public Optional<List<Movie>> getAllMoviesByName(String movieName)
			throws InvalidNameException, InvalidIdException, NoDataFoundException {
		return Optional.ofNullable(movieRepository.findAllByMovieName(movieName));
	}

	@Override
	public String deleteMovieByMovieId(String movieId) throws NoDataFoundException {
		try {
			if (movieRepository.existsById(movieId)) {
				movieRepository.deleteById(movieId);
				return "success";
			} else {
				throw new NoDataFoundException("No movie find with this ID.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "failed";
	}

	@Override
	public Optional<List<Movie>> findByOrderByMovieNameDsc() throws InvalidNameException, InvalidIdException {
		return null;
	}

}
