package com.zee.zee5app.service;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

import javax.naming.InvalidNameException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zee.zee5app.dto.Movie;
import com.zee.zee5app.dto.WebSeries;
import com.zee.zee5app.exceptions.InvalidIdException;
import com.zee.zee5app.exceptions.NoDataFoundException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.repo.WebSeriesRepository;

@Service
public class WebSeriesServiceImpl implements WebSeriesService {

	@Autowired
	private WebSeriesRepository webSeriesRepository;  // Interface ref = class object()
	
	@Override
	public WebSeries insertWebSeries(WebSeries webSeries) throws UnableToGenerateIdException, FileNotFoundException {
		// TODO Auto-generated method stub
		return webSeriesRepository.save(webSeries);
	}

	@Override
	public Optional<WebSeries> updateWebSeries(String webSeriesId, WebSeries webSeries) throws NoDataFoundException {
		if(webSeriesRepository.existsById(webSeriesId)) {
			WebSeries series = webSeriesRepository.findById(webSeriesId).get();
			series.setActors(webSeries.getActors());
			series.setDirector(webSeries.getDirector());
			series.setGenre(webSeries.getGenre());
			series.setLanguages(webSeries.getLanguages());
			series.setEpisodes(webSeries.getEpisodes());
			series.setWebSeriesName(webSeries.getWebSeriesName());
			series.setProduction(webSeries.getProduction());
			series.setTrailer1(webSeries.getTrailer1());
			webSeriesRepository.save(series);
			
			return Optional.ofNullable(webSeries);
		}else {
			throw new NoDataFoundException("Web Series not exist");
		}
	}

	@Override
	public Optional<WebSeries> getWebSeriesByWebSeriesId(String webSeriesId) throws InvalidNameException, InvalidIdException {
		return webSeriesRepository.findById(webSeriesId);
	}

	@Override
	public Optional<List<WebSeries>> getAllWebSeriess() throws InvalidNameException, InvalidIdException {
		return Optional.ofNullable(webSeriesRepository.findAll());
	}

	@Override
	public Optional<List<WebSeries>> getAllWebSeriessByGenre(String genre) throws InvalidNameException, InvalidIdException, NoDataFoundException {
		
		return Optional.ofNullable(webSeriesRepository.findAllByGenre(genre));
	}

	@Override
	public Optional<List<WebSeries>> getAllWebSeriessByName(String webSeriesName) throws InvalidNameException, InvalidIdException, NoDataFoundException {
		return Optional.ofNullable(webSeriesRepository.findAllByWebSeriesName(webSeriesName));
	}

	@Override
	public String deleteWebSeriesByWebSeriesId(String webSeriesId) throws NoDataFoundException {
		try {
			if (webSeriesRepository.existsById(webSeriesId)) {
				webSeriesRepository.deleteById(webSeriesId);
				return "success";
			} else {
				throw new NoDataFoundException("No webseries find with this ID.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "failed";
	}

	@Override
	public Optional<List<WebSeries>> findByOrderByWebSeriesNameDsc() throws InvalidNameException, InvalidIdException {
		// TODO Auto-generated method stub
		return null;
	}

}
