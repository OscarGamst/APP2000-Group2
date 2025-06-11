package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//Oscar
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityFeedDTO {
    private Long activityId;
    private String user;
    private String title;
    private String type;
    private String description;
    private int duration;
    private LocalDateTime timestamp;
}
