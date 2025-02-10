package org.example.workoutapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "run")
public class ActivityRun {
    @Id
    private long id;

    // shares the id from activity
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Activity activity;

    @Column(name = "distance")
    private double distance;

    @Column(name = "pace")
    private double pace;

    @Column(name = "elevation")
    private double elevation;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getPace() {
        return pace;
    }

    public void setPace(double pace) {
        this.pace = pace;
    }

    public double getElevation() {
        return elevation;
    }

    public void setElevation(double elevation) {
        this.elevation = elevation;
    }
}
