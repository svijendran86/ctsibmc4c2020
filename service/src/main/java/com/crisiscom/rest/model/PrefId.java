package com.crisiscom.rest.model;

import java.io.Serializable;
import java.util.Objects;

public class PrefId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String userId;
	private String prefName;
	
	public PrefId()
	{}

	public PrefId(String userId, String prefName) {
		this.userId = userId;
		this.prefName = prefName;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PrefId taskId1 = (PrefId) o;
		if (userId != taskId1.userId)
			return false;
		return prefName == taskId1.prefName;
	}

	@Override
	public int hashCode() {
		return Objects.hash(userId, prefName);
	}

}
