package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.GoalRunDTO;
import org.example.workoutapp.mapper.GoalMapper;
import org.example.workoutapp.repository.GoalRunRepository;
import org.example.workoutapp.service.GoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/goal")
@Tag(name = "Goal Controller", description = "API for goals")
@RequiredArgsConstructor
public class GoalController {
    private final GoalService goalService;
    private final GoalRunRepository goalRunRepository;
    private final GoalMapper goalMapper;

    @PostMapping("/register")
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
}
