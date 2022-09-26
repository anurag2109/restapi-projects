package com.zee.zee5app.dto;

import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.naming.InvalidNameException;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zee.zee5app.enums.Geners;
import com.zee.zee5app.enums.Languages;
import com.zee.zee5app.exceptions.InvalidIdException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
//@Table(name = "movie_table")
public class Movie {
//	public Movie(String actors, String director , String genre, String languages, LocalTime movieLength, String movieName, String production,
//			String trailer1) {
//		this.actors = actors;
//		this.director = director;
//		this.genre = genre;
//		this.languages = languages;
//		this.movieLength = movieLength;
//		this.movieName = movieName;
//		this.production = production;
//		this.trailer1 = trailer1;
//		
//	}
	@Id
	@GenericGenerator(name="movieIdGenerator", strategy = "com.zee.zee5app.utils.MovieIdGenerator")
	@GeneratedValue(generator = "movieIdGenerator")
	private String movieId;
	
    private String[] actors;
    private String movieName;
    private String director;
    private String genre;
    private String production;
	private String[] languages;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime movieLength;
    private String trailer1;
    private String movieBanner;
}
