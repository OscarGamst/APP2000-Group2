package org.example.workoutapp.service;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.mapper.ActivityMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ActivityMapper activityMapper;

    //  ------------------ GET ------------------
    @Override
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Override
    public List<Activity> getActivitiesByType(String type) {
        return activityRepository.findAllByType(type);
    }

    @Override
    public List<Activity> getActivitiesByUsername(String username) {
        return activityRepository.getActivitiesByUsername(username);
    }

    @Override
    public Activity getActivityById(Long id) {
        return activityRepository.findById(id).orElse(null);
    }

    //  ------------------ SAVE ------------------
    @Override
    public void saveActivityWorkout(ActivityWorkoutDTO activityWorkoutDTO) {

        //Get local date time for timestamp
        LocalDateTime timestamp=LocalDateTime.now();

        //Create an activity object using mapper
        Activity newActivity=new


        //Save the id generated for the object

        //Save the activity object to the database

        //turn the exerciseActivityDtos to exerciseobjects by iterating
        //through the list in ActivityWorkoutDto and save them to database


    }

    @Override
    public Activity saveActivityRun(Activity activity) {
        return activityRepository.saveRun(activity);
    }

    @Override
    public Activity saveActivityCombined(Activity activity) {
        return activityRepository.saveActivityInfo(activity);
    }

}
