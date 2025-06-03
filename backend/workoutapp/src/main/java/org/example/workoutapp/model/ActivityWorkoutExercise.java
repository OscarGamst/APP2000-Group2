package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ActivityWorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long exerciseId;

    private String exerciseName;

    private int exerciseSets;

    private int exerciseReps;

    private double exerciseWeight;

    @ManyToOne
    @JoinColumn(name = "activityId")
    private Activity activity;

}
