package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.UserBasicDTO;
import org.example.workoutapp.dto.UserDetailDTO;
import org.example.workoutapp.mapper.UserMapper;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserBasicDTO> getAllUsersBasic() {
        List<Users> users = userRepository.findAll();
        return userMapper.toUserBasicDTO(users);

    }

    public UserDetailDTO updateUser(String username, UserDetailDTO userDTO) {
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));


        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setBirthday(userDTO.getBirthday());
        user.setVisibility(userDTO.isVisibility());

        Users updatedUser = userRepository.save(user);
        return userMapper.toUserDetailDTO(updatedUser);
    }

    public UserDetailDTO createUser(UserDetailDTO userDTO) {
        Users user = new Users();

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setBirthday(userDTO.getBirthday());
        user.setVisibility(userDTO.isVisibility());

        Users savedUser = userRepository.save(user);
        return userMapper.toUserDetailDTO(savedUser);
    }

}
