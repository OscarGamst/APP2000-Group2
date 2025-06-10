package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.dto.AllActivitiesDTO;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ActivityMapper {

    //These two lines are inspired by the lines from the "commentMapper.java" where we used AI.
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "activity.activityId", target = "activityId")
    List<AllActivitiesDTO> toAllActivitiesDTO(List<Activity> allActivities);

    List<ExerciseActivityDTO> toExerciseActivityDTO(List<ActivityWorkoutExercise> activityWorkoutExercises);
}
