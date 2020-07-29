package com.crisiscom.rest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crisiscom.rest.dao.CrisiscomDaoRepository;
import com.crisiscom.rest.dao.FitbitContactDaoRepo;
import com.crisiscom.rest.dao.FitbitDaoRepo;
import com.crisiscom.rest.model.ContactVo;
import com.crisiscom.rest.model.FitbitVo;
import com.crisiscom.rest.model.PrefVo;

@Service
public class CrisiscomServiceimpl implements CriscomService {

	@Autowired
	CrisiscomDaoRepository dao;
	
	@Autowired
	FitbitDaoRepo fdao;
	
	@Autowired
	FitbitContactDaoRepo cfdao;

	@Override
	public List<PrefVo> getPreferences() {
		return dao.findAll();
		//return null;
	}
	@Override
	public List<PrefVo> getPrefById(String userid) {
		return dao.findByUserId(userid);
	}
	@Override
	public PrefVo addPreference(PrefVo pref) {
		return dao.save(pref);
	}
	@Override
	public PrefVo updatePrefernce(PrefVo pref) {
		return dao.save(pref);
	}
	@Override
	public void deletePrefById(String userid) {
		dao.deleteByUserId(userid);
	}
	@Override
	public void deleteAllPreferences() {
		dao.deleteAll();
	}
	
	
	@Override
	public void deletePrefVal(String userid, String prefname) {
		dao.deleteByUserIdAndPrefName(userid,prefname);
	}
	@Override
	public Optional<PrefVo> getPrefVal(String userid, String prefname)
	{
		return dao.findbyIdAndPrefName(userid,prefname);
		//return null;
	}
	@Override
	public FitbitVo addfb(FitbitVo fb) {
		return fdao.save(fb);
	}
	@Override
	public ContactVo addfbc(ContactVo cfb) {
		ContactVo c = new ContactVo();
		String alarm = "no data";
		Optional<List<String>> alarmlist = cfdao.findRisk(cfb.getContactbId());
		if(alarmlist != null && alarmlist.isPresent())
			alarm = alarmlist.get().get(0);
		c = cfdao.save(cfb);
		
		c.setAlarm(alarm);
		return c;
	}
	@Override
	public List<FitbitVo> getFbData() {
		return fdao.findAll();
	}
	@Override
	public Optional<FitbitVo> getfbById(String userid) {
		return fdao.findById(userid);
	}
	@Override
	public FitbitVo updateFb(FitbitVo fb) {
		return fdao.save(fb);
	}
	@Override
	public void deleteFbById(String userid) {
		 fdao.deleteById(userid);
		
	}
	@Override
	public void deleteAllFbData() {
		fdao.deleteAll();		
	}
	@Override
	public List<ContactVo> getCFbData() {
		// TODO Auto-generated method stub
		return cfdao.findAll();
	}
	@Override
	public Optional<ContactVo> getcfbById(String userid) {
		return cfdao.findByUserId(userid);
	}
	@Override
	public ContactVo updateCFb(ContactVo fb) {
		return cfdao.save(fb);
	}
	@Override
	public void deleteCFbById(String userid) {
		cfdao.deleteByUserId(userid);
		
	}
	@Override
	public void deleteAllCFbData() {
		cfdao.deleteAll();		
	}
	
	
	
}