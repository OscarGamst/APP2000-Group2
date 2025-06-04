package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.GoalRunDTO;
import org.example.workoutapp.mapper.GoalMapper;
import org.example.workoutapp.model.GoalRun;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.GoalRunRepository;
import org.example.workoutapp.repository.GoalWeightliftingRepository;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class GoalService {
    private final GoalRunRepository goalRunRepository;
    private final UserRepository userRepository;
    private final GoalWeightliftingRepository goalWeightliftingRepository;
    private final GoalMapper goalMapper;

    public GoalRunDTO createGoalRun(GoalRunDTO goalRunDTO) {
        GoalRun goalRun = new GoalRun();
        //Liten test på om bruker finnes
        Users user = userRepository.findById(goalRunDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + goalRunDTO.getUsername()));

        goalRun.setUser(user);
        goalRun.setGoalId(goalRunDTO.getGoalId());
        goalRun.setType(goalRunDTO.getType());
        goalRun.setRepeating(goalRunDTO.getRepeating());
        goalRun.setFrequency(goalRunDTO.getFrequency());
        goalRun.setDistance(goalRunDTO.getDistance());
        goalRun.setTime(goalRunDTO.getTime());

        GoalRun savedGoalRun = goalRunRepository.save(goalRun);
        return goalMapper.toGoalRunDTO(savedGoalRun);
    }

}
