package org.example.workoutapp.repository;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByType(String type);
    List<Activity> getActivitiesByUsername();

    /*
    When saving one of the activities (combined, workout or run),
    the general information needs to be saved first. To make the application
    code more compartilised, we decided to make this step one function that
    can be called by all the save-methods in the service layer.
     */

    Activity save(Activity activity);

    ActivityWorkoutExercise saveActivityWorkoutExercise(ActivityWorkoutExercise activityWorkoutExercise);

}
