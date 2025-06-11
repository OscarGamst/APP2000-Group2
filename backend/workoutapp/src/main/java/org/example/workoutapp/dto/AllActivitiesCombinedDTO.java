package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllActivitiesCombinedDTO {
    private Integer activityId;
    private String type;
    private String user;
    private String title;
    private String description;
    private int duration;
    private LocalDateTime timestamp;
    private String access;
}
