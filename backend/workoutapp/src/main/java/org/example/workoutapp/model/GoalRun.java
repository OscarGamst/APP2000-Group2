package org.example.workoutapp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class GoalRun {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long runGoalId;

    private String type;
    private String repeating;
    private int frequency;

    private double distance;
    private int time;

    @ManyToOne
    @JoinColumn(name = "username")
    private Users user;
}
