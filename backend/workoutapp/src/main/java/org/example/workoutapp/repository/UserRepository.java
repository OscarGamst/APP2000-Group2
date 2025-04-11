package org.example.workoutapp.repository;

import org.example.workoutapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //User findById(long id);

    User findByEmail(String email);


}
