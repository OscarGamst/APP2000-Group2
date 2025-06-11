package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllActivitiesDTO {
    private Integer activityId;
    private String type;
    private String user;
    private String title;
    private String description;
    private int duration;
    private String access;
    private LocalDateTime timestamp;
    private Set<ExerciseActivityDTO> exercises;
}
