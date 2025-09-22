package com.netflixclone.controller;

import com.netflixclone.model.Movie;
import com.netflixclone.repository.MovieRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieRepository movieRepository;

    public MovieController(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    // single movie by ID
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
        return movieRepository.findById(id).map(movie -> {
            movie.setTitle(updatedMovie.getTitle());
            movie.setGenre(updatedMovie.getGenre());
            movie.setReleaseYear(updatedMovie.getReleaseYear());
            return movieRepository.save(movie);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deleteMovie(@PathVariable Long id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return "Movie deleted successfully!";
        }
        return "Movie not found!";
    }

    
}
