package org.example.workoutapp.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class GoalWeightlifting {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long goalId;

    private String type;
    private String repeating;
    private int frequency;

    private String exerciseName;
    private int sets;
    private double weight;
    private int reps;

    @ManyToOne
    @JoinColumn(name = "username")
    Users user;
}