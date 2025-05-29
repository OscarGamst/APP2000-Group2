package org.example.workoutapp.dto;

import lombok.Data;

@Data
public class ExerciseActivityDTO {
    private String name;
    private int sets;
    private int weight;
    private int reps;
    private int activityId;
}
