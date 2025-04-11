package org.example.workoutapp.service;

import org.example.workoutapp.model.User;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    // GET
    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    //UPDATE
    @Override
    public User updateUser(User user) { return userRepository.save(user); }
}