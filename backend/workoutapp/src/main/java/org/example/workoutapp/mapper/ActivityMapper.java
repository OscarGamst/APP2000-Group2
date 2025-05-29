package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel="spring")
public interface ActivityMapper {


    //Would it be possible to have this go for all the dtos for the different activities?

    //One way this could be implemented is to make the dto include runs as well:3

    Activity toActivity(ActivityWorkoutDTO activityWorkoutDTO);

    ActivityWorkoutExercise toActivityWorkoutExercise(ExerciseActivityDTO ExerciseActivityDTO);
}
