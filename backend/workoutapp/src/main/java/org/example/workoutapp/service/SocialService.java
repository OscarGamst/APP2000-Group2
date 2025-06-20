package org.example.workoutapp.service;

import jakarta.persistence.EntityNotFoundException;
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
import java.util.Optional;

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
    public boolean hasUserLikedActivity(String username, Integer activityId) {
        // sjekker om User finnes
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        //Sjekker om Activity finness
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Activity not found"));
        return likeRepository.findByUserAndActivity(user, activity).isPresent();
        //return likeRepository.findByUsernameAndActivity_id(username, activity_id).isPresent();
    }

    public LikeDTO likeActivity(Users user, Activity activity) {
        //Så man ikke liker sin egen aktivitet
        if (activity.getUser().getUsername().equals(user.getUsername())) {
            throw new IllegalStateException("You cannot like your own activity");
        }
        //Hvis man allerede har likt kan man ikke like igjen
        if (hasUserLikedActivity(user.getUsername(), activity.getActivityId() )) {
            throw new IllegalStateException("User have already liked this activity"); //kan kanskje skrive "you"!=User
        }
        //Lagrer likes
        Likes like = new Likes();
        like.setUser(user);
        like.setActivity(activity);

        Likes savedLike = likeRepository.save(like);
        return likeMapper.toLikeDTO(savedLike);
    }

    public void unlikeActivity(Users user, Activity activity) {
        Optional<Likes> likes = likeRepository.findByUserAndActivity(user, activity);

        if (likes.isPresent()) {
            likeRepository.delete(likes.get());
        } else {
            throw new EntityNotFoundException("User have not liked this activity");
        }
    }
    public List<LikeDTO> getLikes(Integer activityId) {
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Activity not found"));

        List<Likes> likes = likeRepository.findByActivity(activity);
        return likeMapper.toLikeDTO(likes);
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

    public CommentDTO updateComment(Long comment_id, CommentDTO commentDTO) {
        Comment comment = commentRepository.findById(comment_id).orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.setComment_content(commentDTO.getComment_content());
        Comment updatedComment = commentRepository.save(comment);
        return commentMapper.toCommentDTO(updatedComment);
    }

    public List<CommentDTO> getComments(Integer activityId) {
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Activity not found"));

        List<Comment> comments = commentRepository.findByActivity(activity);
        return commentMapper.toCommentDTO(comments);
    }

    public void deleteComment(Long comment_id) {
        if (!commentRepository.existsById(comment_id)) {
            throw new EntityNotFoundException("Comment not found");
        }
        commentRepository.deleteById(comment_id);
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

    public FollowDTO unfollowUser(String followerUsername, String followedUsername) {
        Users follower = userRepository.findById(followerUsername).orElseThrow(() -> new RuntimeException("User not found"));
        Users followed = userRepository.findById(followedUsername).orElseThrow(() -> new RuntimeException("User not found"));
        if (followRepository.findByFollowerAndFollowed(follower, followed).isPresent()) {
            //hvis den finnes kan vi slettan
            followRepository.delete(followRepository.findByFollowerAndFollowed(follower, followed).get());
        } else {
            throw new EntityNotFoundException("Follow-relation not found");
        }
        return null;
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
