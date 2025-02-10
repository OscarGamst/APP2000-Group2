package org.example.workoutapp.service;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

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
    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }


}
