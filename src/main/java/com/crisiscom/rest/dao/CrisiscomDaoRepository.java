package com.crisiscom.rest.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.crisiscom.rest.model.PrefVo;

@Repository
public interface CrisiscomDaoRepository extends JpaRepository<PrefVo, String> {
	
	/*
	 * @Query("select p.userId from PREFERENCE p") public Optional<PrefVo>
	 * findbyIdAndPrefName(String userid, String prefname);
	 */
	
	@Query("FROM PrefVo p where p.userId = ?1 and p.prefName = ?2")
	public Optional<PrefVo> findbyIdAndPrefName(String userid, String prefname);

	public List<PrefVo> findByUserId(String userid);

	@Transactional
	public void deleteByUserId(String userid);

	@Transactional
	public void deleteByUserIdAndPrefName(String userid, String prefname);


}