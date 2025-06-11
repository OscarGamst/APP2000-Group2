package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    @Query(
            value="SELECT activity.* " +
                    "FROM activity " +
                    "WHERE activity.username= :username AND activity.type=:activityType",
            nativeQuery=true
    )
    List<Activity> findActivitiesTypeUsername(@Param("username") String username,  @Param("activityType") String activityType);
}