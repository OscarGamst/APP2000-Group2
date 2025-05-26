package org.example.workoutapp.mapper;

import org.example.workoutapp.dto.UserBasicDTO;
import org.example.workoutapp.dto.UserDetailDTO;
import org.example.workoutapp.model.Users;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserBasicDTO toUserBasicDTO(Users user);
    UserDetailDTO toUserDetailDTO(Users user);

    List<UserBasicDTO> toUserBasicDTO(List<Users> users);
    List<UserDetailDTO> toUserDetailDTO(List<Users> users);
}