package com.crisiscom.rest.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CCExceptionController {
	
	
	   @ExceptionHandler(value = CCNotFoundException.class)
	   public ResponseEntity<Object> exception(CCNotFoundException exception) {
	      return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
	   }
	}

