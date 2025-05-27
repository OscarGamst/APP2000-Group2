package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.CommentDTO;
import org.example.workoutapp.dto.FollowDTO;
import org.example.workoutapp.dto.LikeDTO;
import org.example.workoutapp.mapper.LikeMapper;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.ActivityRepository;
import org.example.workoutapp.repository.UserRepository;
import org.example.workoutapp.service.SocialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/social")
@Tag(name = "Social Controller", description = "API for social functions users")
@RequiredArgsConstructor
public class SocialController {
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final SocialService socialService;
    private final LikeMapper likeMapper;

    // ----------- ----------- ALT MED LIKES ----------- -----------

    @PostMapping("/like")
    @Operation(summary = "Give a like to an activity")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Activity successfulyy liked"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<?> likeActivity(
            @RequestParam String username,
            @RequestParam Long activityId) {
        //Sjekker at username faktisk finnes
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        //Sjekker at activity fakitsk finnes
        Activity activity = activityRepository.findById(activityId).orElseThrow(() -> new RuntimeException("Activity not found"));

        LikeDTO likeDTO = socialService.likeActivity(user, activity);
        return ResponseEntity.ok(likeDTO);
    }
    // ----------- ----------- LIKES ----------- -----------

    // ----------- ----------- ALT MED COMMENTS ----------- -----------
    @PostMapping("/comment")
    @Operation(summary = "Give a comment to an activity")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Activity successfulyy commmented"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<CommentDTO> commentActivity(@Valid @RequestBody CommentDTO commentDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(socialService.commentActivity(commentDTO));

    }
    // ----------- ----------- COMMENTS ----------- -----------

    // ----------- ----------- ALT MED FOLLOW ----------- -----------
    @PostMapping("/follow")
    @Operation(summary = "Give a follow to a user")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User successfulyy Followed"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<FollowDTO> followUser(
            @RequestParam String followerUsername,
            @RequestParam String followedUsername) {
        //Sjekker at de finnes
        Users follower = userRepository.findById(followerUsername).orElseThrow(() -> new RuntimeException("The Follower not found"));
        Users followed = userRepository.findById(followedUsername).orElseThrow(() -> new RuntimeException("Followed not found"));

        FollowDTO followDTO = socialService.followUser(followerUsername, followedUsername);
        return ResponseEntity.ok(followDTO);
    }

    // ----------- ----------- FOLLOW ----------- -----------
}