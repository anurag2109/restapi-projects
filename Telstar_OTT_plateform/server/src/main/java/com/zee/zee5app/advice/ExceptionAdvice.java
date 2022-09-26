package com.zee.zee5app.advice;

import java.util.HashMap;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.zee.zee5app.exceptions.EntryAlreadyExistException;
import com.zee.zee5app.exceptions.UnableToGenerateIdException;
import com.zee.zee5app.exceptions.apierror.ApiError;

@ControllerAdvice
public class ExceptionAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler(EntryAlreadyExistException.class) // to handle the global level exception
	public ResponseEntity<?> entryAlreadyExistExceptionHandler(EntryAlreadyExistException e) {
		HashMap<String, String> resData = new HashMap<>();
		resData.put("status", "Record already exist " + e.getMessage());
		return ResponseEntity.status(HttpStatus.CONFLICT).body(resData);
	}

	@ExceptionHandler(UnableToGenerateIdException.class) // to handle the global level exception
	public ResponseEntity<?> unableToGenerateIdExceptionHandler(UnableToGenerateIdException e) {
		HashMap<String, String> resData = new HashMap<>();
		resData.put("status", "internal id creation proble");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resData);
	}

	private ResponseEntity<Object> buildResponseEntity(ApiError	apiError){
		// to get which RE object === > if I wnat to make any changes into our existing object then in every return we have to do the change 
		// instead of that if we will use buildRE method ===> EOM.
		return new ResponseEntity<>(apiError,apiError.getHttpStatus());
	}
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage("Validation Error");
		apiError.addValidationErrors(ex.getBindingResult().getFieldErrors()); // fieldwise errors
		apiError.addValidationError(ex.getBindingResult().getGlobalErrors());  // this will used when other exception may occur
		return buildResponseEntity(apiError);
	}

}
