package org.example.workoutapp.repository;


import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, String> {

}

