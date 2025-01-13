package com.react.Backend.Repositories;

import com.react.Backend.DTO.AdminUserDTO;
import com.react.Backend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.country.name = :countryName")
    List<User> findByCountryName(@Param("countryName") String countryName);

}
