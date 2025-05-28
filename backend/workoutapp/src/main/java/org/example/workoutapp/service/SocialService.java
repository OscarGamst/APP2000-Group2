package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.CommentDTO;
import org.example.workoutapp.dto.FollowDTO;
import org.example.workoutapp.dto.LikeDTO;
import org.example.workoutapp.mapper.CommentMapper;
import org.example.workoutapp.mapper.FollowMapper;
import org.example.workoutapp.mapper.LikeMapper;
import org.example.workoutapp.mapper.UserMapper;
import org.example.workoutapp.model.*;
import org.example.workoutapp.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SocialService {
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;

    private final UserMapper userMapper;
    private final LikeMapper likeMapper;
    private final CommentMapper commentMapper;
    private final FollowMapper followMapper;
    private final ActivityRepository activityRepository;

    // ----------- ----------- ALT MED LIKES ----------- -----------

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
    // ----------- ----------- LIKES ----------- -----------

    // ----------- ----------- ALT MED COMMENTS ----------- -----------

    public CommentDTO commentActivity(CommentDTO commentDTO) {
        Users user = userRepository.findById(commentDTO.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        Activity activity = activityRepository.findById(commentDTO.getActivityId()).orElseThrow(() -> new RuntimeException("Activity not found"));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setActivity(activity);
        comment.setComment_content(commentDTO.getComment_content());
        comment.setTimestamp(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toCommentDTO(savedComment);
    }

    // ----------- ----------- COMMENTS  ----------- -----------

    // ----------- ----------- ALT MED FOLLOW ----------- -----------
    public FollowDTO followUser(String followerUsername, String followedUsername) {
        //Tester om vi allerede følger brukeren, om brukeren finnes eller om vi prøver å følge oss selv
        if(followerUsername.equals(followedUsername)) {
            throw new IllegalArgumentException("Cannot follow yourself");
        }
        Users follower = userRepository.findById(followerUsername).orElseThrow(() -> new RuntimeException("User not found"));
        Users followed = userRepository.findById(followedUsername).orElseThrow(() -> new RuntimeException("User not found"));
        if(followRepository.findByFollowerAndFollowed(follower, followed).isPresent()) {
            throw new IllegalStateException("Already following");
        }
        //Lagrer at man følger noen
        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowed(followed);
        followRepository.save(follow);
        return followMapper.toFollowDTO(follow);
    }

    // vil returnere en liste med brukere som følger en person
    //alle som følger meg
    public List<FollowDTO> getUsersFollowers(String followedUsername) {
        List<Follow> followers = followRepository.findByFollowedUsername(followedUsername);
        return followMapper.toFollowDTOList(followers);
    }

    // vil returnere en liste over brukere som en person følger
    //alle jeg følger
    public List<FollowDTO> getUserIsFollowing(String followerUsername) {
        List<Follow> following = followRepository.findByFollowerUsername(followerUsername);
        return followMapper.toFollowDTOList(following);
    }
}
