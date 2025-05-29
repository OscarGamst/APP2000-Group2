package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long follow_id;

    @ManyToOne
    @JoinColumn(name = "follower_username")
    private Users follower;

    @ManyToOne
    @JoinColumn(name = "followed_username")
    private Users followed;

}
