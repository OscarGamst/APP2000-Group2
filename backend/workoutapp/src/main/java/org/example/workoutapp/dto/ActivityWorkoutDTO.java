package org.example.workoutapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class ActivityWorkoutDTO {
    private int type;
    private String title;
    private String description;
    private int duration;
    private List<ExerciseActivityDTO> exercises;
}
