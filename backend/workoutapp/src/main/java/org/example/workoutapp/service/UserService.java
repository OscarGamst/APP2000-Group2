package org.example.workoutapp.service;

import org.example.workoutapp.model.User;

import java.util.Optional;

public interface UserService {
    User getUser(Long id);
    User getUserByEmail(String email);

    User updateUser(User user);
}