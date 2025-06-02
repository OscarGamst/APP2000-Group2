package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="activityId")
    private long activityId;

    @Column(name="activityType")
    private String type;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="duration")
    private int duration;

    @Column(name="published")
    private LocalDateTime published;

    @Column(name="postAccess")
    private String access;


    //Malin's fields
    @ManyToOne
    @JoinColumn(name="username")
    private Users user;

    @OneToMany(mappedBy="activity", cascade=CascadeType.ALL, orphanRemoval = true)
    private Set<ActivityWorkoutExercise> activityWorkoutExercises = new HashSet<>();

    //Oscar's fields
    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Likes> likes = new HashSet<>();

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments = new HashSet<>();

}
