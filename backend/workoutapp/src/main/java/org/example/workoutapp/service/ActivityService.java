package org.example.workoutapp.service;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.model.Activity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ActivityService {
    //  ------------------ GET------------------

    //  ------------------ SAVE ------------------
    Activity saveActivityWorkout(ActivityWorkoutDTO activityWorkoutDTO);
    //Activity saveActivityRun(Activity activity);
    //Activity saveActivityCombined(Activity activity);
}