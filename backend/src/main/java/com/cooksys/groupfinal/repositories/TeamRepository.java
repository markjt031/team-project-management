package com.cooksys.groupfinal.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM team_teammates WHERE teams_id = :teamId", nativeQuery = true)
    void unlinkAllUsersFromTeam(@Param("teamId") Long teamId);

}