package com.zee.zee5app.utils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import com.zee.zee5app.dto.WebSeries;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;

public class WebSeriesIdGenerator implements IdentifierGenerator {
	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		WebSeries series = (WebSeries) object;
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		String query = "select id from webseriesidgenerator";
		String updatequery = "update webseriesidgenerator set id=? where id=?";
		ResultSet resultSet = null;
		int old_id;
		// connection object
		connection = session.connection();
		
		try {
			// get old id from webseriesidgenerator table and increment the id and append it for webseriesid
			preparedStatement = connection.prepareStatement(query);
			resultSet = preparedStatement.executeQuery();
			if(resultSet.next() == true) {
				int num = resultSet.getInt(1);
				old_id = num;
				num++;
				int length_of_id = (int)(Math.log10(num)+1);
				String webseriesId = series.getWebSeriesName().substring(0, 2)+"0".repeat(10-2-length_of_id)+num; // to make the id of length 10
				
				// update the incremented id to webseriesidgenerator table
				preparedStatement = connection.prepareStatement(updatequery);
				preparedStatement.setInt(1, num);
				preparedStatement.setInt(2, old_id);
				int res = preparedStatement.executeUpdate();
				if(res == 0)
					throw new UnableToGenerateIdException("Unable to generate id");
				
				// return webseriesid
				return webseriesId;
			}
		}catch (SQLException | UnableToGenerateIdException e) {
			e.printStackTrace();
			System.out.println(e);
		}
		return null;
	}
}
