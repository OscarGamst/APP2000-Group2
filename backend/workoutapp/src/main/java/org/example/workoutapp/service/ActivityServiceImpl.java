package org.example.workoutapp.service;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.example.workoutapp.mapper.ActivityMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ActivityMapper activityMapper;

    //  ------------------ GET ------------------

    //  ------------------ SAVE ------------------
    @Override
    public Activity saveActivityWorkout(ActivityWorkoutDTO activityWorkoutDTO) {

        //Get local date time for timestamp
        LocalDateTime timestamp=LocalDateTime.now();

        //Get current user logged in


        //Create an activity object using mapper
        Activity newActivity=activityMapper.toActivity(activityWorkoutDTO);
        newActivity.setPublished(timestamp);

        //Save the activity object to the database
        activityRepository.save(newActivity);

        //turn the exerciseActivityDtos to exerciseobjects by iterating
        //through the list in ActivityWorkoutDto and save them to database

        for (ExerciseActivityDTO exerciseActivityDTO:activityWorkoutDTO.getExercises()) {
            exerciseActivityDTO.setActivity(newActivity);
            ActivityWorkoutExercise newExercise=activityMapper.toActivityWorkoutExercise(exerciseActivityDTO);
            activityRepository.saveActivityWorkoutExercise(newExercise);
        }

        return newActivity;

    }

    /*Override
    public Activity saveActivityRun(Activity activity) {
        return activityRepository.saveRun(activity);
    }

    @Override
    public Activity saveActivityCombined(Activity activity) {
        return activityRepository.saveActivityInfo(activity);
    }

     */

}
