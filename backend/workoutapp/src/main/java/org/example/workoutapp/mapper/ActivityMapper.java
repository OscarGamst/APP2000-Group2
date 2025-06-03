package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)

public interface ActivityMapper {

    //Would it be possible to have this go for all the dtos for the different activities?

    //One way this could be implemented is to make the dto include runs as well:3

    //Need a function to tell which user is online xd - this has to be added to the activity
    @Mapping(source="user", target="user.username")
    Activity toActivity(ActivityWorkoutDTO activityWorkoutDTO);

    //@Mapping(source = "activityId", target = "activity.activityId")
    ActivityWorkoutExercise toActivityWorkoutExercise(ExerciseActivityDTO exerciseActivityDTO);

}
