package org.example.workoutapp.repository;

import org.example.workoutapp.model.ActivityRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivityRunRepository extends JpaRepository<ActivityRun, Long> {

    @Query(
            value="SELECT activity_run.distance " +
                    "FROM activity_run " +
                    "WHERE activity_run.activity_id=:activityRunId",
            nativeQuery=true
    )
    double findDistanceWithId(@Param("activityRunId") double activityRunId);

}
