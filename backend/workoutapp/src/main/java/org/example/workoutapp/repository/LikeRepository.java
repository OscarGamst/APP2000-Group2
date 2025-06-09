package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Likes;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByUserAndActivity(Users user, Activity activity);
    List<Likes> findByActivity(Activity activity);
    //Optional<Like> findByUsernameAndActivity_id(Users user, Activity activity);
}
