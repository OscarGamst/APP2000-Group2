package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateActivityDTO {
    private Integer activityId;
    private String title;
    private String description;
    private int duration;
    private String access;
}
