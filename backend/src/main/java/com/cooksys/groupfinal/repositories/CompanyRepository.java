package com.cooksys.groupfinal.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM company_employees WHERE companies_id = :companyId", nativeQuery = true)
    void unlinkAllUsersFromCompany(@Param("companyId") Long companyId);



}