package org.example.workoutapp.controller;

import org.example.workoutapp.model.Activity;
//import org.example.workoutapp.repository.ActivityRepository;
import org.example.workoutapp.service.ActivityService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;


    // Constructor
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    //  ------------------ GET ------------------
    //  ---------INSERT ALL GETTERS HERE---------

    @GetMapping()
    public List<Activity> getActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/type/{type}")
    public List<Activity> getActivitiesByType(@PathVariable String type) {
        return activityService.getActivitiesByType(type);
    }

    @GetMapping("/username/{username}")
    public List<Activity> getActivitiesByUsername(@PathVariable String username) {
        return activityService.getActivitiesByUsername(username);
    }

    @GetMapping("/{id}")
    public Activity getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id);
    }

    //  ------------------ POST ------------------
    //  ---------INSERT ALL POSTERS HERE----------

    @PostMapping
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        Activity savedActivity = activityService.saveActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivity);
    }


    //  ------------------ PUT ------------------
    //  ---------INSERT ALL PUTTERS HERE---------


    //  ------------------ DELETE ------------------
    //  ---------INSERT ALL DELETES HERE------------
}
