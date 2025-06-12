package org.example.workoutapp.repository;

import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Set;

public interface ActivityWorkoutExerciseRepository extends JpaRepository<ActivityWorkoutExercise, Long> {
    ActivityWorkoutExercise save(ActivityWorkoutExercise activityWorkoutExercise);

    Set<ActivityWorkoutExercise> findByActivity_ActivityId(Integer activityId);
}
