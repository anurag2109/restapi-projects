package com.zee.zee5app.dto;

import javax.naming.InvalidNameException;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

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
//@Table(name = "webseries")
public class WebSeries {
	@Id
	@GenericGenerator(name="webSeriesIdGenerator", strategy = "com.zee.zee5app.utils.WebSeriesIdGenerator")
	@GeneratedValue(generator = "webSeriesIdGenerator")
	private String webSeriesId;
    private String[] actors;
    private String webSeriesName;
    private String director;
    private String genre;
    private String production;
	private String[] languages;
    private int episodes;
    private String trailer1;
}
