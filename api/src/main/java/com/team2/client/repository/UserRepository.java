package com.team2.client.repository;

import com.team2.client.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    @Query("SELECT FUNCTION('YEAR', u.created), FUNCTION('MONTH', u.created), FUNCTION('WEEK', u.created), COUNT(u) " +
            "FROM User u " +
            "GROUP BY FUNCTION('YEAR', u.created), FUNCTION('MONTH', u.created), FUNCTION('WEEK', u.created) " +
            "ORDER BY FUNCTION('YEAR', u.created), FUNCTION('MONTH', u.created), FUNCTION('WEEK', u.created)")
    List<Object[]> countRegistrationsByMonthWeek();

}
