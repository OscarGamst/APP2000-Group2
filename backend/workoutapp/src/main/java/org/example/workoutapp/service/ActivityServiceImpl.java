package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.example.workoutapp.mapper.ActivityMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.ActivityRepository;
import org.example.workoutapp.repository.ActivityWorkoutExerciseRepository;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class ActivityServiceImpl {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ActivityWorkoutExerciseRepository activityWorkoutExerciseRepository;

    @Autowired
    private ActivityMapper activityMapper;

    @Autowired
    private UserRepository userRepository;

    //  ------------------ GET ------------------

    //  ------------------ SAVE ------------------
    public Activity saveActivityWorkout(ActivityWorkoutDTO activityWorkoutDTO) {

        Activity newActivity=new Activity();

        newActivity.setType(activityWorkoutDTO.getType());
        newActivity.setTitle(activityWorkoutDTO.getTitle());
        newActivity.setDescription(activityWorkoutDTO.getDescription());
        newActivity.setDuration(activityWorkoutDTO.getDuration());
        newActivity.setAccess(activityWorkoutDTO.getAccess());

        //Find the user in the database - copy of Oscar's code
        Users user = userRepository.findById(activityWorkoutDTO.getUser()).orElseThrow(() -> new RuntimeException("User not found"));

        newActivity.setUser(user);

        //Save the activity object to the database
        activityRepository.save(newActivity);

        Activity registeredActivity = activityRepository.findById(newActivity.getActivityId()).orElseThrow(() -> new RuntimeException("Activity not found"));

        //turn the exerciseActivityDtos to exerciseobjects by iterating
        //through the list in ActivityWorkoutDto and save them to database

            for (ExerciseActivityDTO exerciseActivityDTO:activityWorkoutDTO.getExercises()) {
                System.out.println(1);
                ActivityWorkoutExercise newActivityWorkoutExercise=new ActivityWorkoutExercise();
                System.out.println(2);
                newActivityWorkoutExercise.setActivity(registeredActivity);
                System.out.println(3);
                newActivityWorkoutExercise.setExerciseName(exerciseActivityDTO.getName());
                System.out.println(4);
                newActivityWorkoutExercise.setExerciseSets(exerciseActivityDTO.getSets());
                System.out.println(5);
                newActivityWorkoutExercise.setExerciseReps(exerciseActivityDTO.getReps());
                System.out.println(6);
                newActivityWorkoutExercise.setExerciseWeight(exerciseActivityDTO.getWeight());
                System.out.println(7);
                activityWorkoutExerciseRepository.save(newActivityWorkoutExercise);
                System.out.println(8);
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
