package com.zee.zee5app.restcontroller;

import java.io.FileNotFoundException;
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
import com.zee.zee5app.dto.WebSeries;
import com.zee.zee5app.exceptions.InvalidIdException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.service.WebSeriesServiceImpl;

@RestController
@RequestMapping("/api/webseries")
public class WebSeriesController {
	@Autowired
	WebSeriesServiceImpl webSeriesServiceImpl;
	
	@PostMapping("/add")
	public ResponseEntity<?> insertWebSeries(@RequestBody WebSeries webSeries) throws FileNotFoundException, UnableToGenerateIdException{
		WebSeries webSeries2 = webSeriesServiceImpl.insertWebSeries(webSeries);
		return ResponseEntity.status(HttpStatus.CREATED).body(webSeries2);
	}
	
	@PutMapping("/updateSeries/{id}")
	public ResponseEntity<?> updateWebSeries(@PathVariable("id") String id,@RequestBody WebSeries webSeries) throws NoDataFoundException
	{
		
		Optional<WebSeries> m = webSeriesServiceImpl.updateWebSeries(id, webSeries);
		return ResponseEntity.ok().body(m.get());
	}
	
	
	@DeleteMapping("/delete/{webseriesid}")
	public String deleteWebSeriesById(@PathVariable("webseriesid") String webseriesid) throws NoDataFoundException {
		webSeriesServiceImpl.deleteWebSeriesByWebSeriesId(webseriesid);
		
		return "deleted successfully "+webseriesid;
	}
	
	@GetMapping("/get/{webseriesid}")
	public Optional<WebSeries> getWebSeriesByWebSeriesId(@PathVariable("webseriesid") String webseriesid) throws InvalidNameException, InvalidIdException{
		
		return webSeriesServiceImpl.getWebSeriesByWebSeriesId(webseriesid);
	}
	
	@GetMapping("/getallwebseries")
	public Optional<List<WebSeries>> getAllWebSeries() throws InvalidNameException, InvalidIdException{
		System.out.println(webSeriesServiceImpl.getAllWebSeriess());
		return webSeriesServiceImpl.getAllWebSeriess();
	}
	
	@GetMapping("/getwebseriesbygenre/{genre}")
	public Optional<List<WebSeries>> getAllWebSeriesByGenre(@PathVariable("genre") String genre) throws InvalidNameException, InvalidIdException, NoDataFoundException {
		return webSeriesServiceImpl.getAllWebSeriessByGenre(genre);
	}
	@GetMapping("/getseriesbyname/{webseriesname}")
	public Optional<List<WebSeries>> getAllWebSeriesByName(@PathVariable("webseriesname") String webseriesname) throws InvalidNameException, InvalidIdException, NoDataFoundException{
		return webSeriesServiceImpl.getAllWebSeriessByName(webseriesname);
	}
}
