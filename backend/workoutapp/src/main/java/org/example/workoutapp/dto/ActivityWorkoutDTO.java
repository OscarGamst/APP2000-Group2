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
    private String user;
    private String title;
    private String description;
    private int duration;
    private String access;
    private ArrayList<ExerciseActivityDTO> exercises;
}
