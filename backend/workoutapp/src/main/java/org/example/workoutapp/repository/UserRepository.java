package org.example.workoutapp.repository;


import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Users, String> {

    Users findByUsername(String username);

    List<Users> findAllByUsernameContainingIgnoreCase(String username);

}

