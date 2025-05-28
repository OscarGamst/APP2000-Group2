package org.example.workoutapp.repository;

import org.example.workoutapp.model.Activity;
import org.example.workoutapp.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByActivity(Activity activity);
}
