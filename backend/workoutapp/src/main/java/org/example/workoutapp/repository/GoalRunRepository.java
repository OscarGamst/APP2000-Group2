package org.example.workoutapp.repository;

import org.example.workoutapp.model.GoalRun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRunRepository extends JpaRepository<GoalRun, Long> {
}
