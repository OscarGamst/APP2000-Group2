package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.GoalRunDTO;
import org.example.workoutapp.dto.GoalWeightliftingDTO;
import org.example.workoutapp.model.GoalRun;
import org.example.workoutapp.model.GoalWeightlifting;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface GoalMapper {
    @Mapping(source = "user.username", target = "username")
    GoalRunDTO toGoalRunDTO(GoalRun goalRun);
    @Mapping(source = "user.username", target = "username")
    GoalWeightliftingDTO toGoalWeightliftingDTO(GoalWeightlifting goalWeightlifting);

    List<GoalRunDTO> toGoalRunDTO(List<GoalRun> goalRuns);
    List<GoalWeightliftingDTO> toGoalWeightliftingDTO(List<GoalWeightlifting> goalWeightliftings);
}
