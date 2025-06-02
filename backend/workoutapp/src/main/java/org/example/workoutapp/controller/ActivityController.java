package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.model.Activity;
//import org.example.workoutapp.repository.ActivityRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.example.workoutapp.service.ActivityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/activity")
@Tag(name = "Activity Controller", description = "API for controlling activities")
@RequiredArgsConstructor
public class ActivityController {

    @Autowired
    private final ActivityServiceImpl activityServiceImpl;

    //  ------------------ GET ------------------
    //  ---------INSERT ALL GETTERS HERE---------



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
        System.out.println(activityWorkoutDTO);
        Activity newActivityWorkout=activityServiceImpl.saveActivityWorkout(activityWorkoutDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newActivityWorkout);
    }

    /*@PostMapping("/run")
    public ResponseEntity<Activity> addRun(@RequestBody Activity activity) {
        Activity savedActivityRun = activityService.saveActivityRun(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivityRun);
    }

    @PostMapping("/combined")
    public ResponseEntity<Activity> addCombined(@RequestBody Activity activity) {
        Activity savedActivityCombined = activityService.saveActivityCombined(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedActivityCombined);
    }

     */

    //  ------------------ PUT ------------------
    //  ---------INSERT ALL PUTTERS HERE---------




    //  ------------------ DELETE ------------------
    //  ---------INSERT ALL DELETES HERE------------
}
