package com.crisiscom.rest.model;

import java.io.Serializable;
import java.util.Objects;

public class ContactId implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String userId;
	
	private String bluetoothId;

	private String contactbId;


	public ContactId()
	{}

	public ContactId(String userId, String bluetoothId, String contactbId) {
		this.userId = userId;
		this.bluetoothId = bluetoothId;
		this.contactbId = contactbId;
	}
	
	/*@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ContactId taskId1 = (ContactId) o;
		if (userId != taskId1.userId)
			return false;
		if (bluetoothId != taskId1.bluetoothId)
			return false;
		return contactbId == taskId1.contactbId;
	}*/
	
	 @Override
	    public boolean equals(Object o) {
	        if (this == o) {
	            return true;
	        } 
	        if(!(o instanceof ContactId)) {
	            return false;
	        }
	        ContactId bk_info = (ContactId) o;
	        return Objects.equals(userId, bk_info.userId) && Objects.equals(bluetoothId, bk_info.bluetoothId) && Objects.equals(contactbId, bk_info.contactbId);
	    }

	@Override
	public int hashCode() {
		return Objects.hash(userId, bluetoothId,contactbId);
	}
}
