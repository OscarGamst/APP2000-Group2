package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.LikeDTO;
import org.example.workoutapp.mapper.LikeMapper;
import org.example.workoutapp.mapper.UserMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Likes;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.ActivityRepository;
import org.example.workoutapp.repository.LikeRepository;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SocialService {
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    private final UserMapper userMapper;
    private final LikeMapper likeMapper;
    private final ActivityRepository activityRepository;

    public boolean hasUserLikedActivity(String username, Long activity_id) {
        // sjekker om User finnes
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        //Sjekker om Activity finness
        Activity activity = activityRepository.findById(activity_id).orElseThrow(() -> new RuntimeException("Activity not found"));
        return likeRepository.findByUserAndActivity(user, activity).isPresent();
        //return likeRepository.findByUsernameAndActivity_id(username, activity_id).isPresent();
    }

    public LikeDTO likeActivity(Users user, Activity activity) {
        //Hvis man allerede har likt kan man ikke like igjen
        if (hasUserLikedActivity(user.getUsername(), activity.getActivity_id() )) {
            throw new IllegalStateException("User have already liked this activity"); //kan kanskje skrive "you"!=User
        }
        //Lagrer likes
        Likes like = new Likes();
        like.setUser(user);
        like.setActivity(activity);

        Likes savedLike = likeRepository.save(like);
        return likeMapper.toLikeDTO(savedLike);
    }
}
