package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.CommentDTO;
import org.example.workoutapp.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CommentMapper {
    CommentDTO toCommentDTO(Comment comment);

    List<CommentDTO> toCommentDTO(List<Comment> comments);
}
