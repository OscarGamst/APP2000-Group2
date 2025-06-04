package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalWeightliftingDTO {
    private Long weightGoalId;
    private String type;
    private String repeating;
    private int frequency;
    private String exerciseName;
    private int sets;
    private double weight;
    private int reps;
    private String username;
}
