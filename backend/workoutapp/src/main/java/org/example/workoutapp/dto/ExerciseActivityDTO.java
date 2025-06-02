package org.example.workoutapp.dto;

import lombok.Data;
import org.example.workoutapp.model.Activity;

@Data
public class ExerciseActivityDTO {
    private String name;
    private int sets;
    private int weight;
    private int reps;
    private Activity activity;
}
