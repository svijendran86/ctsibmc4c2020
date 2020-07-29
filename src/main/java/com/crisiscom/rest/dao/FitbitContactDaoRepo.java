package com.crisiscom.rest.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.crisiscom.rest.model.ContactVo;

@Repository
public interface FitbitContactDaoRepo extends JpaRepository<ContactVo, String> {
	
	/*
	 * @Query("select p.userId from PREFERENCE p") public Optional<PrefVo>
	 * findbyIdAndPrefName(String userid, String prefname);
	 */
	
	@Query(value="select f.riskStatus FROM FitbitVo f where f.bluetoothId = ?1")
	public Optional<List<String>> findRisk(String bid);

	public Optional<ContactVo> findByUserId(String userid);

	@Transactional
	public void deleteByUserId(String userid);


}