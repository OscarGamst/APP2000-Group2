package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.workoutapp.model.Likes;

import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long activity_id;

    /*
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    */

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Likes> likes = new HashSet<>();

}
