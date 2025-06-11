package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.*;
import org.example.workoutapp.mapper.ActivityMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityRun;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.ActivityRepository;
import org.example.workoutapp.repository.ActivityRunRepository;
import org.example.workoutapp.repository.ActivityWorkoutExerciseRepository;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class ActivityServiceImpl {

    private final ActivityRepository activityRepository;
    private final ActivityWorkoutExerciseRepository activityWorkoutExerciseRepository;
    private final ActivityMapper activityMapper;
    private final UserRepository userRepository;
    private final ActivityRunRepository activityRunRepository;

    //  ------------------ GET ------------------

    public List<AllActivitiesDTO> getAllActivities(String username) {

        //Check if the username exists. If it does not, throw an error.
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        //Get a list of all activities registered on the user ordered by timestamp and map each
        //activity object to an all-activities-dto.
        List<Activity> allActivities=activityRepository.findActivitiesTypeUsername(username, "weightlifting");
        List<AllActivitiesDTO> allActivitiesList=activityMapper.toAllActivitiesDTO(allActivities);


        //Iterate through the list to check the types of each activity registered
        for (AllActivitiesDTO allActivitiesDTO:allActivitiesList){

            //Find the exercises in the exercises table
            //and put them in a set. Then, update the exercises field in the dto to the set.

            Set<ActivityWorkoutExercise> exercises=activityWorkoutExerciseRepository.findByActivity_ActivityId(allActivitiesDTO.getActivityId());
            allActivitiesDTO.setExercises(activityMapper.toExerciseActivityDTO(exercises));

        }

        //Lastly, return the list back to frontend.
        return allActivitiesList;

    }

    public List<AllActivitiesRunsDTO> getAllActivitiesRuns(@PathVariable String username) {

        //Check if the username exists. If it does not, throw an error.
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        //Get a list of all activities registered on the user ordered by timestamp and map each
        //activity object to an all-activities-dto.
        List<Activity> allActivities=activityRepository.findActivitiesTypeUsername(username, "run");
        List<AllActivitiesRunsDTO> allActivitiesRunsList=activityMapper.toAllActivitiesRunsDTO(allActivities);

        //Iterate through the list to check the types of each activity registered
        for (AllActivitiesRunsDTO allActivitiesRunsDTO:allActivitiesRunsList){

            //Find the exercises in the exercises table
            //and put them in a set. Then, update the exercises field in the dto to the set.

            double distance=activityRunRepository.findDistanceWithId(Double.parseDouble(String.valueOf(allActivitiesRunsDTO.getActivityId())));
            allActivitiesRunsDTO.setDistance(distance);

        }

        return allActivitiesRunsList;
    }


    //  ------------------ SAVE ------------------

    public Activity saveActivity(ActivityWorkoutDTO activityWorkoutDTO) {
        //Create new activity
        Activity newActivity=new Activity();

        //Generate id for activity
        boolean idExist=true;
        SecureRandom random=new SecureRandom();
        Long newActivityId =null;

        while (idExist) {
            newActivityId=random.nextLong();

            if (newActivityId<0) {
                newActivityId=newActivityId*(-1);
            }

            var foundActivity=activityRepository.findById(newActivityId).orElse(null);

            if (foundActivity==null) {
                newActivity.setActivityId(newActivityId);
                idExist=false;
            }
        }

        newActivity.setType(activityWorkoutDTO.getType());
        newActivity.setTitle(activityWorkoutDTO.getTitle());
        newActivity.setDescription(activityWorkoutDTO.getDescription());
        newActivity.setDuration(activityWorkoutDTO.getDuration());
        newActivity.setTimestamp(LocalDateTime.now());
        newActivity.setAccess(activityWorkoutDTO.getAccess());

        //Find the user in the database - copy of Oscar's code
        Users user = userRepository.findById(activityWorkoutDTO.getUser()).orElseThrow(() -> new RuntimeException("User not found"));

        newActivity.setUser(user);

        return activityRepository.save(newActivity);
    }

    public void saveActivityWorkoutExercise(ExerciseActivityDTO exerciseActivityDTO, Activity newActivity) {
        ActivityWorkoutExercise newActivityWorkoutExercise=new ActivityWorkoutExercise();

        newActivityWorkoutExercise.setActivity(newActivity);

        newActivityWorkoutExercise.setExerciseName(exerciseActivityDTO.getName());
        newActivityWorkoutExercise.setExerciseSets(exerciseActivityDTO.getSets());
        newActivityWorkoutExercise.setExerciseReps(exerciseActivityDTO.getReps());

        newActivityWorkoutExercise.setExerciseWeight(exerciseActivityDTO.getWeight());

        activityWorkoutExerciseRepository.save(newActivityWorkoutExercise);

    }

    public Activity saveActivityWorkout(ActivityWorkoutDTO activityWorkoutDTO) {

        Activity newActivity=saveActivity(activityWorkoutDTO);

        //turn the exerciseActivityDtos to exerciseobjects by iterating
        //through the list in ActivityWorkoutDto and save them to database

            for (ExerciseActivityDTO exerciseActivityDTO:activityWorkoutDTO.getExercises()) {
                saveActivityWorkoutExercise(exerciseActivityDTO, newActivity);

            }

        return newActivity;

    }

    public Activity saveActivityRun(ActivityRunDTO activityRunDTO) {
        //Create new activity
        Activity newActivity=new Activity();

        //Generate id for activity
        boolean idExist=true;
        SecureRandom random=new SecureRandom();
        Long newActivityId =null;

        while (idExist) {
            newActivityId=random.nextLong();

            if (newActivityId<0) {
                newActivityId=newActivityId*(-1);
            }

            var foundActivity=activityRepository.findById(newActivityId).orElse(null);

            if (foundActivity==null) {
                newActivity.setActivityId(newActivityId);
                idExist=false;
            }
        }

        newActivity.setType(activityRunDTO.getType());
        newActivity.setTitle(activityRunDTO.getTitle());
        newActivity.setDescription(activityRunDTO.getDescription());
        newActivity.setDuration(activityRunDTO.getDuration());
        newActivity.setTimestamp(LocalDateTime.now());
        newActivity.setAccess(activityRunDTO.getAccess());

        //Find the user in the database - copy of Oscar's code
        Users user = userRepository.findById(activityRunDTO.getUser()).orElseThrow(() -> new RuntimeException("User not found"));

        newActivity.setUser(user);

        Activity newRegisteredActivity=activityRepository.save(newActivity);

        //Create the run
        ActivityRun newActivityRun=new ActivityRun();

        newActivityRun.setActivity(newRegisteredActivity);
        newActivityRun.setDistance(activityRunDTO.getDistance());

        activityRunRepository.save(newActivityRun);

        return newActivity;
    }

    public Activity saveActivityCombined(ActivityCombinedDTO activityCombinedDTO) {
        //Create new activity
        Activity newActivity=new Activity();

        //Generate id for activity
        boolean idExist=true;
        SecureRandom random=new SecureRandom();
        Long newActivityId =null;

        while (idExist) {
            newActivityId=random.nextLong();

            if (newActivityId<0) {
                newActivityId=newActivityId*(-1);
            }

            var foundActivity=activityRepository.findById(newActivityId).orElse(null);

            if (foundActivity==null) {
                newActivity.setActivityId(newActivityId);
                idExist=false;
            }
        }

        newActivity.setType(activityCombinedDTO.getType());
        newActivity.setTitle(activityCombinedDTO.getTitle());
        newActivity.setDescription(activityCombinedDTO.getDescription());
        newActivity.setDuration(activityCombinedDTO.getDuration());
        newActivity.setTimestamp(LocalDateTime.now());
        newActivity.setAccess(activityCombinedDTO.getAccess());

        //Find the user in the database - copy of Oscar's code
        Users user = userRepository.findById(activityCombinedDTO.getUser()).orElseThrow(() -> new RuntimeException("User not found"));

        newActivity.setUser(user);

        return activityRepository.save(newActivity);
    }
}
