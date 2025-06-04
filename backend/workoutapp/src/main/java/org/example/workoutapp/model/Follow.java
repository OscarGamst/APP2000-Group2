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
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "followerUsername")
    private Users follower;

    @ManyToOne
    @JoinColumn(name = "followedUsername")
    private Users followed;

}
