package com.zee.zee5app.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.zee.zee5app.enums.Geners;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Employee {
  public Employee(String dept, String name, int salary ) {
		// TODO Auto-generated constructor stub
	  this.dept = dept;
	  this.name = name;
	  this.salary = salary;
	}
  @Id
  @GeneratedValue
  private Long id;
  private String name;
  private String dept;
  private int salary;
    
}
