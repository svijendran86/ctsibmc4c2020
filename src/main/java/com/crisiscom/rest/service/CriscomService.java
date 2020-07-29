package com.crisiscom.rest.service;

import java.util.List;
import java.util.Optional;

import com.crisiscom.rest.model.ContactVo;
import com.crisiscom.rest.model.FitbitVo;
import com.crisiscom.rest.model.PrefVo;

public interface CriscomService {

	public List<PrefVo> getPreferences();
	public List<PrefVo> getPrefById(String userid);
	public PrefVo addPreference(PrefVo pref);
	public PrefVo updatePrefernce(PrefVo pref);
	public void deletePrefById(String userid);
	public void deleteAllPreferences();
	public Optional<PrefVo> getPrefVal(String userid, String prefname);
	public void deletePrefVal(String userid, String prefname);
	
	
	public FitbitVo addfb(FitbitVo fb);
	public List<FitbitVo> getFbData();
	public Optional<FitbitVo> getfbById(String userid);
	public FitbitVo updateFb(FitbitVo fb);
	public void deleteFbById(String userid);
	public void deleteAllFbData();
	
	
	public ContactVo addfbc(ContactVo cfb);
	public List<ContactVo> getCFbData();
	public Optional<ContactVo> getcfbById(String userid);
	public ContactVo updateCFb(ContactVo fb);
	public void deleteCFbById(String userid);
	public void deleteAllCFbData();
	
	
	
		

}