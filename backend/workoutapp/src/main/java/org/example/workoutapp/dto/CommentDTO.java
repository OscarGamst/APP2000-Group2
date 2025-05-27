package org.example.workoutapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private long comment_id;
    private String comment_content;
    private LocalDateTime timestamp;
    private String username;
    private long activityId;
}
