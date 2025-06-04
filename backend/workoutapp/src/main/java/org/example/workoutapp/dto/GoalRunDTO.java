package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalRunDTO {
    private Long goalId;
    private String type;
    private String repeating;
    private int frequency;
    private double distance;
    private int time;
    private String username;
}
