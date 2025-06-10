package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query(
            value="SELECT activity.*, COUNT(likes.like_id) as totalLikes " +
                    "FROM activity " +
                    "LEFT JOIN likes ON activity.activity_id=likes.activity_id "+
                    "GROUP BY activity.activity_id "+
                    "HAVING activity.username= :username AND activity.type=:activityType",
            nativeQuery=true
    )
    List<Activity> findActivitiesTypeUsername(@Param("username") String username,  @Param("activityType") String activityType);
}