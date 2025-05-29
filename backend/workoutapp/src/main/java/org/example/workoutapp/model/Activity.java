package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int activityId;

    @Column(name = "type")
    private String type;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private int duration;

    @Column(name = "type")
    private String activityType;

    //@Column(nullable=false,name= "accessibility")
    //private Boolean accessibility;

    @Column(name = "published")
    private LocalDateTime published; //This may be wrong

    //@ManyToOne
    //@JoinColumn(name="username")
    //private User username;

    //@Column(name = "calories")
    //private int calories;

}
