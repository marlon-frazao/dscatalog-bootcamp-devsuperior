package com.devsuperior.dscatalog.resources.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.devsuperior.dscatalog.services.exceptions.AlreadyExistsException;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(ResourceNotFoundException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.NOT_FOUND;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "Resource not found!"));
	}
	
	@ExceptionHandler(AlreadyExistsException.class)
	public ResponseEntity<StandardError> entityAlreadyExists(AlreadyExistsException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "Entity already exists!"));
	}

	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<StandardError> database(DatabaseException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "Database Exception!"));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "Validation Exception!"));
	}
	
	@ExceptionHandler(AmazonServiceException.class)
	public ResponseEntity<StandardError> amazonService(AmazonServiceException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "AWS Exception"));
	}
	
	@ExceptionHandler(AmazonClientException.class)
	public ResponseEntity<StandardError> amazonClient(AmazonClientException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "AWS Exception"));
	}
	
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<StandardError> illegalArgument(IllegalArgumentException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		return ResponseEntity.status(status).body(getStandardError(e, request, status, "Bad request"));
	}

	private StandardError getStandardError(Exception e, HttpServletRequest request, HttpStatus status, String error) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(status.value());
		err.setError(error);
		err.setMessage(e.getMessage());
		err.setPath(request.getRequestURI());

		if (e instanceof MethodArgumentNotValidException) {
			ValidationError vError = new ValidationError(err);
			((MethodArgumentNotValidException) e).getBindingResult().getFieldErrors().forEach(f -> vError.addError(f.getField(), f.getDefaultMessage()));
			return vError;
		}
		return err;
	}
}
