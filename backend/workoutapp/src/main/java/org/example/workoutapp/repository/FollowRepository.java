package org.example.workoutapp.repository;

import org.example.workoutapp.model.Follow;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollower(Users follower);
    List<Follow> findByfollowed(Users followed);
    Optional<Follow> findByFollowerAndFollowed(Users follower, Users followed);
}
