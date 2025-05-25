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
    @Column (nullable=false, name="exercise_name")
    private String exerciseName;

    @Column (nullable=false, name="exercise_sets")
    private int exerciseSets;

    @Column (nullable=false, name="exercise_reps")
    private int exerciseReps;

    @Column (nullable=false, name="exercise_weight")
    private double exerciseWeight;

    @ManyToOne
    @JoinColumn(name="activity_id")
    private Activity activity;
}
