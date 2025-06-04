package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.GoalRunDTO;
import org.example.workoutapp.dto.GoalWeightliftingDTO;
import org.example.workoutapp.mapper.GoalMapper;
import org.example.workoutapp.repository.GoalRunRepository;
import org.example.workoutapp.service.GoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/goal")
@Tag(name = "Goal Controller", description = "API for goals")
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;
    private final GoalRunRepository goalRunRepository;
    private final GoalMapper goalMapper;

    @PostMapping("/register/run")
    @Operation(summary = "Create a new RunGoal")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "RunGoal created successfulyy"),
            @ApiResponse(responseCode = "400", description = "Invalid user Data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<GoalRunDTO> createRunGoal(@Valid @RequestBody GoalRunDTO runDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(goalService.createGoalRun(runDTO));
    }
    @PostMapping("/register/weightlift")
    @Operation(summary = "Create a new WeightliftGoal")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "WeightliftGoal created successfulyy"),
            @ApiResponse(responseCode = "400", description = "Invalid user Data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<GoalWeightliftingDTO> createWeightliftingGoal(@Valid @RequestBody GoalWeightliftingDTO weightliftingDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(goalService.createGoalWeightlifting(weightliftingDTO));
    }
    @GetMapping("/run/{username}")
    @Operation(summary = "Get all run goals for a username")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved run goals"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<GoalRunDTO>> getAllRunGoals(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(goalService.getGoalRuns(username));
    }
    @GetMapping("/weightlifting/{username}")
    @Operation(summary = "Get all weightlifting goals for a username")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved weightlift goals"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<GoalWeightliftingDTO>> getGoalWeightliftings(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(goalService.getGoalWeightliftings(username));
    }
}
