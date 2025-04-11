package org.example.workoutapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")

    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "visibility")
    private Boolean visibility;
}

