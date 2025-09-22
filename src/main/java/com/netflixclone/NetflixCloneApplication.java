package com.netflixclone;

import com.netflixclone.model.Movie;
import com.netflixclone.model.User;
import com.netflixclone.repository.MovieRepository;
import com.netflixclone.repository.UserRepository;
import com.netflixclone.service.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class NetflixCloneApplication {

    public static void main(String[] args) {
        SpringApplication.run(NetflixCloneApplication.class, args);
    }

    @Bean
    CommandLineRunner run(MovieRepository movieRepository, UserRepository userRepository, UserService userService) {
        return args -> {
            if (movieRepository.count() == 0) {
                movieRepository.save(new Movie("Inception", "Sci-Fi", 2010));
                movieRepository.save(new Movie("The Dark Knight", "Action", 2008));
                movieRepository.save(new Movie("Interstellar", "Sci-Fi", 2014));
            }

            if (userRepository.count() == 0) {
                userService.registerUser(new User("Hero", "Yes@example.com", "password123"));
                userService.registerUser(new User("Alina", "Becker@example.com", "securePass"));
                userService.registerUser(new User("Meme", "meme@example.com", "test123"));
            }
        };
    }

}
