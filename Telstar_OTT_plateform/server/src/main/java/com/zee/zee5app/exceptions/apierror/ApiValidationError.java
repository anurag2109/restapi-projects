package com.zee.zee5app.exceptions.apierror;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)// it will not call super.hashcode/super.equals
@AllArgsConstructor
public class ApiValidationError extends ApiSubError {
	
	private String object;
	private String field;
	private Object rejectedValue;
	private String message;
	public ApiValidationError(String object, String message) {
		this.object = object;
		this.message = message;
	}

}
