package com.zee.zee5app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zee.zee5app.dto.WebSeries;

public interface WebSeriesRepository extends JpaRepository<WebSeries, String> {
	public List<WebSeries> findAllByWebSeriesName(String webSeriesName);
	public List<WebSeries> findAllByGenre(String genre);
}
