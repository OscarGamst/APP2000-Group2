package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.LikeDTO;
import org.example.workoutapp.model.Likes;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface LikeMapper {
    LikeDTO toLikeDTO(Likes like);

    List<LikeDTO> toLikeDTO(List<Likes> likes);

}