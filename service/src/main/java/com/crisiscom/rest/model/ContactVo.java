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

@Entity
@Table(name = "BLUCONTACT")
@IdClass(ContactId.class)
public class ContactVo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ContactVo()
	{}

	public ContactVo(String userId, String bluetoothId, String contactbId) {
		this.userId = userId;
		this.bluetoothId = bluetoothId;
		this.contactbId = contactbId;
	}

	@Id
	@Column(name = "USER_ID")
	@NonNull
	private String userId;

	@Id
	@Column(name = "BLUE_ID")
	@NonNull
	private String bluetoothId;
	
	@Id
	@Column(name = "CON_BLUE_ID")
	@NonNull
	private String contactbId;

	@Column(name = "DATE")
	@NonNull
	private String date;
	
	private String alarm;

	public String getAlarm() {
		return alarm;
	}

	public void setAlarm(String alarm) {
		this.alarm = alarm;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBluetoothId() {
		return bluetoothId;
	}

	public void setBluetoothId(String bluetoothId) {
		this.bluetoothId = bluetoothId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContactbId() {
		return contactbId;
	}

	public void setContactbId(String contactbId) {
		this.contactbId = contactbId;
	}
	
	
}
