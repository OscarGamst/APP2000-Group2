package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllActivitiesDTO {
    private long activityId;
    private String type;
    private String user;
    private String title;
    private String description;
    private int duration;
    private String access;
    private double distance;
    private int likes;
    private int comments;
    private List<ExerciseActivityDTO> exercises;
}
