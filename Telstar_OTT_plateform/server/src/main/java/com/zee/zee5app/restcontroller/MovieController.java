package com.zee.zee5app.restcontroller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.naming.InvalidNameException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zee.zee5app.dto.Movie;
import com.zee.zee5app.exceptions.InvalidIdException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.service.MovieServiceImpl;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

	@Autowired
	MovieServiceImpl movieServiceImpl;
	
	@PostMapping("/add")
	public ResponseEntity<?> insertMovie(@RequestBody Movie movie) throws UnableToGenerateIdException, IOException{
		Movie movie2 = movieServiceImpl.insertMovie(movie);
		return ResponseEntity.status(HttpStatus.CREATED).body(movie2);
	}
	
	@PutMapping("/update-movie/{id}")
	public ResponseEntity<?> updateMovie(@PathVariable("id") String id,@RequestBody Movie movie) throws NoDataFoundException
	{
		
		Optional<Movie> m = movieServiceImpl.updateMovie(id, movie);
		return ResponseEntity.ok().body(m.get());
	}
	
	@DeleteMapping("/delete/{movieid}")
	public String deleteMovieById(@PathVariable("movieid") String movieid) throws NoDataFoundException {
		movieServiceImpl.deleteMovieByMovieId(movieid);
		
		return "deleted successfully "+movieid;
	}
	
	@GetMapping("/get/{movieid}")
	public Optional<Movie> getMovieByMovieId(@PathVariable("movieid") String movieid) throws InvalidNameException, InvalidIdException{
		
		return movieServiceImpl.getMovieByMovieId(movieid);
	}
	
	@GetMapping("/getallmovie")
	public Optional<List<Movie>> getAllMovies() throws InvalidNameException, InvalidIdException{
		return movieServiceImpl.getAllMovies();
	}
	
	@GetMapping("/getmoviebygenre/{genre}")
	public Optional<List<Movie>> getAllMoviesByGenre(@PathVariable("genre") String genre) throws InvalidNameException, InvalidIdException, NoDataFoundException {
		return movieServiceImpl.getAllMoviesByGenre(genre);
	}
	@GetMapping("/getmoviebyname/{moviename}")
	public Optional<List<Movie>> getAllMoviesByName(@PathVariable("moviename") String moviename) throws InvalidNameException, InvalidIdException, NoDataFoundException{
		return movieServiceImpl.getAllMoviesByName(moviename);
	}
	
}
