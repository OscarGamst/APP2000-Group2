package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRunDTO {
    private String description;
    private int duration;
    private String type;
    private String title;
    private String user;
    private String access;
    private double distance;
}
