package org.example.workoutapp.repository;

import org.example.workoutapp.model.ActivityRun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRunRepository extends JpaRepository<ActivityRun, Long> {

}
