package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.*;
import org.example.workoutapp.mapper.ActivityMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.service.ActivityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/activity")
@Tag(name = "Activity Controller", description = "API for controlling activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityServiceImpl activityServiceImpl;
    private final ActivityMapper activityMapper;

    //  ------------------ GET ------------------
    //  ---------INSERT ALL GETTERS HERE---------


    @GetMapping("/allActivitiesWeightlifting/{username}")
    @Operation(summary = "Get all Weightlifting activities")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "List recieved"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<AllActivitiesDTO>> getAllActivities(@PathVariable String username) {
        return ResponseEntity.ok(activityServiceImpl.getAllActivities(username));
    }

    @GetMapping("/allActivitiesRuns/{username}")
    @Operation(summary = "Get all Run Activites")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "List recieved"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<AllActivitiesRunsDTO>> getAllActivitiesRuns(@PathVariable String username) {
        return ResponseEntity.ok(activityServiceImpl.getAllActivitiesRuns(username));
    }

    @GetMapping("/allActivitiesCombined/{username}")
    @Operation(summary = "Get all Combined Activities")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "List recieved"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<AllActivitiesCombinedDTO>> getAllActivitiesCombined(@PathVariable String username) {
        return ResponseEntity.ok(activityServiceImpl.getAllActivitiesCombined(username));
    }

    //  ------------------ POST ------------------
    //  ---------INSERT ALL POSTERS HERE----------

    @PostMapping("/workout")
    @Operation(summary = "Create a Weightlifting Activity")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Workout registered"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<ActivityBasicDTO> addWorkout(@RequestBody ActivityWorkoutDTO activityWorkoutDTO) {
        Activity newActivityWorkout=activityServiceImpl.saveActivityWorkout(activityWorkoutDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(activityMapper.map(newActivityWorkout));
    }

    @PostMapping("/run")
    @Operation(summary = "Create Run Activity")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Run registered"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<ActivityBasicDTO> addRun(@RequestBody ActivityRunDTO activityRunDTO) {
        Activity savedActivityRun = activityServiceImpl.saveActivityRun(activityRunDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(activityMapper.map(savedActivityRun));
    }


    @PostMapping("/combined")
    @Operation(summary = "Create a Combined Activity")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Combined activity registered"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<ActivityBasicDTO> addCombined(@RequestBody ActivityCombinedDTO activityCombinedDTO) {
        Activity savedActivityCombined = activityServiceImpl.saveActivityCombined(activityCombinedDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(activityMapper.map(savedActivityCombined));
    }

    //  ------------------ PUT ------------------
    //  ---------INSERT ALL PUTTERS HERE---------
    //Due to time constraints, we decided to make updating the activities limited to only the information
    //registered in the activity table. This endpoint can therefore be used by all activity types.
    @PutMapping("/updateActivity")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Activity updated"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public void updateActivity(@RequestBody UpdateActivityDTO updateActivityDTO) {
        activityServiceImpl.updateActivity(updateActivityDTO);
    }




    //  ------------------ DELETE ------------------
    //  ---------INSERT ALL DELETES HERE------------
    @DeleteMapping("/deleteActivity/{activityId}")
    @Operation(summary = "Delete an Activity with ActivityId")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Activity deleted"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public void deleteActivity(@PathVariable int activityId) {
        activityServiceImpl.deleteActivity(activityId);
    }
}
