package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.CommentDTO;
import org.example.workoutapp.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CommentMapper {
    //These two lines with @Mapping I used AI, because I couldn't figure out why it wasn't mapping username/activityid correctly
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "activity.activityId", target = "activityId")
    CommentDTO toCommentDTO(Comment comment);

    List<CommentDTO> toCommentDTO(List<Comment> comments);
}
