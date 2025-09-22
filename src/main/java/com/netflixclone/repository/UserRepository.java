package com.netflixclone.repository;

import com.netflixclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA will auto-implement this method
    Optional<User> findByEmail(String email);
}
