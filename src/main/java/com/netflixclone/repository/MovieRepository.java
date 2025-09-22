package com.netflixclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.netflixclone.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
