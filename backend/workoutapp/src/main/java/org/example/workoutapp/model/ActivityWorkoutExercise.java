package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
public class ActivityWorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long exerciseId;

    private String exerciseName;

    private int exerciseSets;

    private int exerciseReps;

    private int exerciseWeight;

    @ManyToOne
    @JoinColumn(name = "activityId")
    private Activity activity;

    //This was gotten from chatgpt
    public Integer getActivityId() {
        return activity != null ? activity.getActivityId() : null;
    }
}
