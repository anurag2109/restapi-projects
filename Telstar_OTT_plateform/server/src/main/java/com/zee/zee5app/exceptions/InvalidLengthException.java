package com.zee.zee5app.exceptions;

public class InvalidLengthException extends Exception {
	//step to create the custom exception:
	// it should have toString method: either write @ToString above the class or override the toString() method
	// super call
	public InvalidLengthException(String msg) {
		// TODO Auto-generated constructor stub
		super(msg);
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.getMessage();
	}
}
