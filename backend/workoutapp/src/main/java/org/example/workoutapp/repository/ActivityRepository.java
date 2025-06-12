package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Modifying
    @Query(
            value="UPDATE activity "+
                    "SET title=:newTitle, description=:newDescription, duration=:newDuration, access=:newAccess "+
                    "WHERE activity_id=:oldActivityId",
            nativeQuery = true
    )
    void updateActivity(@Param("oldActivityId") Integer oldActivityId,
                        @Param("newTitle") String newTitle,
                        @Param("newDescription") String newDescription,
                        @Param("newDuration") int newDuration,
                        @Param("newAccess") String newAccess
    );
}