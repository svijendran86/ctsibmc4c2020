package com.crisiscom.rest.exception;

public class CCNotFoundException extends RuntimeException {

	public CCNotFoundException(String string) {
		super(string);
		System.out.println("Exception"+ string);
	}

	public CCNotFoundException() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
