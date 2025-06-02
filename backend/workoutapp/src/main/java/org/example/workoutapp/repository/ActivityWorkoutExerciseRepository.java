package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityWorkoutExerciseRepository extends JpaRepository<Activity, Long> {
    ActivityWorkoutExercise save(ActivityWorkoutExercise activityWorkoutExercise);
}
