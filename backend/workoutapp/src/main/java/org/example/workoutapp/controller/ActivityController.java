package org.example.workoutapp.controller;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
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

    /*
    @PostMapping
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        Activity savedActivity = activityService.saveActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivity);
    }
     */

    @PostMapping("/workout")
    public ResponseEntity<Activity> addWorkout(@RequestBody ActivityWorkoutDTO activityWorkoutDTO) {
        Activity savedActivityWorkout = activityService.saveActivityWorkout(activityWorkoutDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivityWorkout);
    }

    @PostMapping("/run")
    public ResponseEntity<Activity> addRun(@RequestBody Activity activity) {
        Activity savedActivityRun = activityService.saveActivityRun(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivityRun);
    }

    @PostMapping("/combined")
    public ResponseEntity<Activity> addCombined(@RequestBody Activity activity) {
        Activity savedActivityCombined = activityService.saveActivityCombined(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivityCombined);
    }

    //  ------------------ PUT ------------------
    //  ---------INSERT ALL PUTTERS HERE---------




    //  ------------------ DELETE ------------------
    //  ---------INSERT ALL DELETES HERE------------
}
