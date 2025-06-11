package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
public class ActivityRun {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer runId;

    private double distance;

    @OneToOne
    @JoinColumn(name="activityId")
    private Activity activity;
}
