package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
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

    @Query(
            value="UPDATE activity "+
                    "SET activity.title=:newTitle, activity.description=:newDescription, activity.duration=:newDuration, activity.Access=:newAccess, activity.timestamp=:newTimestamp "+
                    "WHERE activity.activity_id=:oldActivityId",
            nativeQuery = true
    )
    void updateActivity(@Param("oldActivityId") Integer oldActivityId,
                            @Param("newTitle") String newTitle,
                            @Param("newDescription") String newDescription,
                            @Param("newDuration") int newDuration,
                            @Param("newAccess") String newAccess,
                            @Param("newTimestamp")LocalDateTime newTimestamp
    );
}