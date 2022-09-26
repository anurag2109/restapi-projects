package com.zee.zee5app.payload.request;

import java.time.LocalDate;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class SignupRequest {
	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(min = 3, max = 20)
	private String firstName;
	@NotBlank
	@Size(min = 3, max = 20)
	private String lastName;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	private Set<String> role;

	@NotBlank
	@Size(min = 4, max = 40)
	private String password;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate dob;
}
