package org.example.workoutapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


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
