package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.*;
import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.ActivityWorkoutExercise;
import org.example.workoutapp.model.Users;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ActivityMapper {

    default AllActivitiesDTO mapToDTO(Activity activity) {
        AllActivitiesDTO allActivitiesDTO=new AllActivitiesDTO();
        allActivitiesDTO.setActivityId(activity.getActivityId());
        allActivitiesDTO.setType(activity.getType());
        allActivitiesDTO.setUser(activity.getUser().getUsername());
        allActivitiesDTO.setTitle(activity.getTitle());
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

    default List<AllActivitiesDTO> toAllActivitiesDTO(List<Activity> allActivities) {
        return allActivities.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    Set<ExerciseActivityDTO> toExerciseActivityDTO(Set<ActivityWorkoutExercise> activityWorkoutExercises);

    default AllActivitiesRunsDTO mapToRunsDTO(Activity activity) {
        AllActivitiesRunsDTO allActivitiesRunsDTO=new AllActivitiesRunsDTO();
        allActivitiesRunsDTO.setActivityId(activity.getActivityId());
        allActivitiesRunsDTO.setType(activity.getType());
        allActivitiesRunsDTO.setUser(activity.getUser().getUsername());
        allActivitiesRunsDTO.setTitle(activity.getTitle());
        allActivitiesRunsDTO.setDescription(activity.getDescription());
        allActivitiesRunsDTO.setDuration(activity.getDuration());
        allActivitiesRunsDTO.setAccess(activity.getAccess());
        allActivitiesRunsDTO.setDistance(0);
        return allActivitiesRunsDTO;
    }

    default List<AllActivitiesRunsDTO> toAllActivitiesRunsDTO(List<Activity> allActivities) {
        return allActivities.stream()
                .map(this::mapToRunsDTO)
                .collect(Collectors.toList());
    }

    default AllActivitiesCombinedDTO mapToCombinedDTO(Activity activity) {
        AllActivitiesCombinedDTO allActivitiesCombinedDTO=new AllActivitiesCombinedDTO();
        allActivitiesCombinedDTO.setActivityId(activity.getActivityId());
        allActivitiesCombinedDTO.setType(activity.getType());
        allActivitiesCombinedDTO.setUser(activity.getUser().getUsername());
        allActivitiesCombinedDTO.setTitle(activity.getTitle());
        allActivitiesCombinedDTO.setDescription(activity.getDescription());
        allActivitiesCombinedDTO.setDuration(activity.getDuration());
        allActivitiesCombinedDTO.setAccess(activity.getAccess());
        return allActivitiesCombinedDTO;
    }

    default List<AllActivitiesCombinedDTO> toAllActivitiesCombinedDTO(List<Activity> allActivities) {
        return allActivities.stream()
                .map(this::mapToCombinedDTO)
                .collect(Collectors.toList());
    }

    //Oscar
    @Mapping(source ="user.username", target = "user")
    ActivityFeedDTO mapToActivityFeedDTO(Activity activity);

    List<ActivityFeedDTO> toActivityFeedDTO(List<Activity> activityFeed);
}
