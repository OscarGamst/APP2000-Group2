package org.example.workoutapp.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="Activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityWorkout {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (nullable=false, name="activity_id")
    private int activityId;

    @Column(nullable=false, name="description")
    private String description;

    @Column(nullable = false, name="duration")
    private int duration;

    @Column(nullable=false, name="accessibility")
    private String accessibility;

    @Column(nullable=false, name="published")
    private LocalDate published;

    @Column(nullable=false, name="combined")
    private boolean combined;

    @Column(nullable=false, name="timestamp")
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name="publisher")
    private User user;
}