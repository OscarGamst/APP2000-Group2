package org.example.workoutapp.repository;

import org.example.workoutapp.model.Follow;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollowedUsername(String followedUsername); //alle som følger meg
    List<Follow> findByFollowerUsername(String followedUsername); //alle jeg følger
    Optional<Follow> findByFollowerAndFollowed(Users follower, Users followed);
}
