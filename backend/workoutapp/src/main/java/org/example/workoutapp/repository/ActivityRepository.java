package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAllByType(String type);
    List<Activity> getActivitiesByUsername(String username);
}
