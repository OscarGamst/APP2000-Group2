package org.example.workoutapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private long activityId;

    private String type;

    private String title;

    private String description;

    private int duration;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;

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
