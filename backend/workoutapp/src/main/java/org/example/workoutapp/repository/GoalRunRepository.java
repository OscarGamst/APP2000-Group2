package org.example.workoutapp.repository;

import org.example.workoutapp.model.GoalRun;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRunRepository extends JpaRepository<GoalRun, Long> {
    List<GoalRun> findAllByUser(Users user);
}
