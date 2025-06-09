package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.GoalRunDTO;
import org.example.workoutapp.dto.GoalWeightliftingDTO;
import org.example.workoutapp.mapper.GoalMapper;
import org.example.workoutapp.model.GoalRun;
import org.example.workoutapp.model.GoalWeightlifting;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.GoalRunRepository;
import org.example.workoutapp.repository.GoalWeightliftingRepository;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
        goalRun.setRunGoalId(goalRunDTO.getRunGoalId());
        goalRun.setType(goalRunDTO.getType());
        goalRun.setRepeating(goalRunDTO.getRepeating());
        goalRun.setFrequency(goalRunDTO.getFrequency());
        goalRun.setDistance(goalRunDTO.getDistance());
        goalRun.setTime(goalRunDTO.getTime());

        GoalRun savedGoalRun = goalRunRepository.save(goalRun);
        return goalMapper.toGoalRunDTO(savedGoalRun);
    }

    public GoalWeightliftingDTO createGoalWeightlifting(GoalWeightliftingDTO goalWeightliftingDTO) {
        GoalWeightlifting goalWeightlifting = new GoalWeightlifting();

        Users user = userRepository.findById(goalWeightliftingDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + goalWeightliftingDTO.getUsername()));

        goalWeightlifting.setUser(user);
        goalWeightlifting.setWeightGoalId(goalWeightliftingDTO.getWeightGoalId());
        goalWeightlifting.setType(goalWeightliftingDTO.getType());
        goalWeightlifting.setRepeating(goalWeightliftingDTO.getRepeating());
        goalWeightlifting.setFrequency(goalWeightliftingDTO.getFrequency());
        goalWeightlifting.setExerciseName(goalWeightliftingDTO.getExerciseName());
        goalWeightlifting.setSets(goalWeightliftingDTO.getSets());
        goalWeightlifting.setWeight(goalWeightliftingDTO.getWeight());
        goalWeightlifting.setReps(goalWeightliftingDTO.getReps());

        GoalWeightlifting savedGoalWeightlifting = goalWeightliftingRepository.save(goalWeightlifting);
        return goalMapper.toGoalWeightliftingDTO(savedGoalWeightlifting);
    }

    public List<GoalRunDTO> getGoalRuns(String username) {
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalRun> goalRuns = goalRunRepository.findAllByUser(user);
        return goalMapper.toGoalRunDTO(goalRuns);
    }

    public List<GoalWeightliftingDTO> getGoalWeightliftings(String username) {
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        List<GoalWeightlifting> goalWeightliftings = goalWeightliftingRepository.findByUser(user);
        return goalMapper.toGoalWeightliftingDTO(goalWeightliftings);
    }

}
