package com.zee.zee5app.dto;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.UniqueElements;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "email"),
		@UniqueConstraint(columnNames = "username")
})
public class User{
	@Id
	@GenericGenerator(name="userIdGenerator", strategy = "com.zee.zee5app.utils.UserIdGenerator")
	@GeneratedValue(generator = "userIdGenerator")
//	@GeneratedValue(strategy = GenerationType.AUTO)  
	private String userId;
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	@NotNull
	private String username;
	@NotNull
//	@Size(min = 3, max = 10)
	private String password;
	@Email
	@Size(max = 50)
	private String email;
	
	@Column(columnDefinition = "DATE")
//	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate doj;
	
	@Column(columnDefinition = "DATE")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dob;	
	
	private boolean active;
	
	@ManyToMany(fetch = FetchType.LAZY)
	// 3rd table
	@JoinTable(name="user_role", joinColumns = @JoinColumn(name="userId"),
	inverseJoinColumns = @JoinColumn(name="roleId"))	
	private Set<Role> roles = new HashSet<>();
	
}
