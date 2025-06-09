package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityWorkoutDTO {
    private String type;
    private String title;
    private String description;
    private int duration;
    private ArrayList<ExerciseActivityDTO> exercises;
}
