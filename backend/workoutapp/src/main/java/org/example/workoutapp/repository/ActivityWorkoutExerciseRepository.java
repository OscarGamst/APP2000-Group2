package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ActivityWorkoutExerciseRepository extends JpaRepository<ActivityWorkoutExercise, Long> {
    ActivityWorkoutExercise save(ActivityWorkoutExercise activityWorkoutExercise);

    Set<ActivityWorkoutExercise> findByActivity_ActivityId(Integer activityId);
}
