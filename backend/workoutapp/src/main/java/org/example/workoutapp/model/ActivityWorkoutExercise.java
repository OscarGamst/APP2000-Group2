package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityWorkoutExercise {

    @Id
    @Column(nullable=false, name="exerciseId")
    private long exerciseId;

    @Column (nullable=false, name="exerciseName")
    private String exerciseName;

    @Column (nullable=false, name="exerciseSets")
    private int exerciseSets;

    @Column (nullable=false, name="exerciseReps")
    private int exerciseReps;

    @Column (nullable=false, name="exerciseWeight")
    private double exerciseWeight;

    @ManyToOne
    @JoinColumn(name="activityId")
    private Activity activity;
}
