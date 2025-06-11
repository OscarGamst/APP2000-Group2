package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllActivitiesCombinedDTO {
    private long activityId;
    private String type;
    private String user;
    private String title;
    private String description;
    private int duration;
    private String access;
}
