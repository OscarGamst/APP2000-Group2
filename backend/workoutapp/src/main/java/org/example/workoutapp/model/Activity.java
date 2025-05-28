package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int activityId;

    @Column(nullable=false,name = "type")
    private String type;

    @Column(nullable=false, name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(nullable=false,name = "duration")
    private int duration;

    @Column(nullable=false,name = "type")
    private String activityType;

    //@Column(nullable=false,name= "accessibility")
    //private Boolean accessibility;

    @Column(nullable=false, name = "published")
    private LocalDateTime published; //This may be wrong

    //@ManyToOne
    //@JoinColumn(name="username")
    //private User username;

    //@Column(name = "calories")
    //private int calories;

}
