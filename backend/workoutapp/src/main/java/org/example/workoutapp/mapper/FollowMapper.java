package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.FollowDTO;
import org.example.workoutapp.model.Follow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface FollowMapper {
    @Mapping(source = "follower.username", target = "followerUsername")
    @Mapping(source = "followed.username", target = "followedUsername")
    FollowDTO toFollowDTO(Follow follow);
    List<FollowDTO> toFollowDTOList(List<Follow> follows);
}

