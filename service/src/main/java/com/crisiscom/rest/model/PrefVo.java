package com.crisiscom.rest.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component

// Spring jpa jars.
@Entity
@Table(name = "PREFERENCE")
@IdClass(PrefId.class)
// To increase speed and save sql statement execution time.
//@DynamicInsert
//@DynamicUpdate
public class PrefVo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PrefVo() {
	}
	
	public PrefVo(String userId, String prefName) {
		this.userId = userId;
		this.prefName = prefName;
	}


	
	/*
	 * @Id
	 * 
	 * @GeneratedValue(strategy= GenerationType.IDENTITY) private int id;
	 */
	 

	
	@Id
	@Column(name = "USER_ID")
	@NonNull
	private String userId;

	@Id
	@Column(name = "PREF_NAME")
	@NonNull
	private String prefName;
	
	@Column(name = "PREF_VALUE")
	@NonNull
	private String prefValue;

	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getPrefName() {
		return prefName;
	}

	public void setPrefName(String prefName) {
		this.prefName = prefName;
	}

	public String getPrefValue() {
		return prefValue;
	}

	public void setPrefValue(String prefValue) {
		this.prefValue = prefValue;
	}
	

	@Override
	public String toString() {
		return "Crisiscom [ prefName=" + prefName + ", prefValue=" + prefValue + "]";
	}

}