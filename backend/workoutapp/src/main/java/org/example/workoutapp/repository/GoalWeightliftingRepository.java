package org.example.workoutapp.repository;

import org.example.workoutapp.model.GoalWeightlifting;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalWeightliftingRepository extends JpaRepository<GoalWeightlifting, Long> {
    List<GoalWeightlifting> findByUser(Users user);
}
