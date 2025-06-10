package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.ActivityWorkoutDTO;
import org.example.workoutapp.dto.AllActivitiesDTO;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.dto.ExerciseActivityDTO;
import org.example.workoutapp.model.Users;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ActivityMapper {

    default AllActivitiesDTO map(Activity activity) {
        AllActivitiesDTO allActivitiesDTO=new AllActivitiesDTO();
        allActivitiesDTO.setActivityId(activity.getActivityId());
        allActivitiesDTO.setType(activity.getType());
        allActivitiesDTO.setUser(activity.getUser().getUsername());
        allActivitiesDTO.setTitle(activity.getTitle());
        allActivitiesDTO.setDescription(activity.getDescription());
        allActivitiesDTO.setDescription(activity.getDescription());
        allActivitiesDTO.setDuration(activity.getDuration());
        allActivitiesDTO.setAccess(activity.getAccess());
        allActivitiesDTO.setExercises(null);
        return allActivitiesDTO;
    }

    default ExerciseActivityDTO map(ActivityWorkoutExercise activityWorkoutExercise) {
        ExerciseActivityDTO exerciseActivityDTO=new ExerciseActivityDTO();
        exerciseActivityDTO.setName(activityWorkoutExercise.getExerciseName());
        exerciseActivityDTO.setSets(activityWorkoutExercise.getExerciseSets());
        exerciseActivityDTO.setReps(activityWorkoutExercise.getExerciseReps());
        exerciseActivityDTO.setWeight(activityWorkoutExercise.getExerciseWeight());
        return exerciseActivityDTO;
    }

    List<AllActivitiesDTO> toAllActivitiesDTO(List<Activity> allActivities);

    //List<ExerciseActivityDTO> toExerciseActivityDTO(List<ActivityWorkoutExercise> activityWorkoutExercises);
}
