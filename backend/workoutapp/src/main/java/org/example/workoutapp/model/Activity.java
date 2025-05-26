package org.example.workoutapp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

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

    @Column(nullable=false,name= "accessibility")
    private Boolean accessibility;

    @Column(nullable=false, name = "published")
    private LocalDateTime published; //This may be wrong

    @ManyToOne
    @JoinColumn(name="username")
    private User username;

    //@Column(name = "calories")
    //private int calories;

    //Sjekk om vi kan få rettet opp i lombok greiene

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    //public int getCalories() {
    //    return calories;
    //}

    //public void setCalories(int calories) {
    //    this.calories = calories;
    //}
}
