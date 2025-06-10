package org.example.workoutapp.service;

import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.UserBasicDTO;
import org.example.workoutapp.dto.UserDetailDTO;
import org.example.workoutapp.dto.UserNoPwDTO;
import org.example.workoutapp.mapper.UserMapper;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    public List<UserDetailDTO>getAllUsersDetailed() {
        List<Users> users = userRepository.findAll();
        return userMapper.toUserDetailDTO(users);
    }

    public UserNoPwDTO updateWithoutPassword(String username, UserNoPwDTO userNoPwDTO) {
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));

        user.setEmail(userNoPwDTO.getEmail());
        user.setBirthday(userNoPwDTO.getBirthday());
        user.setVisibility(userNoPwDTO.isVisibility());

        Users updatedUser = userRepository.save(user);
        return userMapper.toUserNoPwDTO(updatedUser);
    }

    public List<UserBasicDTO> getAllUsersLike(String username) {
        List<Users> users = userRepository.findAllByUsernameContainingIgnoreCase(username);
        return userMapper.toUserBasicDTO(users);
    }

    public UserDetailDTO updateUser(String username, UserDetailDTO userDTO) {
        Users user = userRepository.findById(username).orElseThrow(() -> new RuntimeException("User not found"));


        user.setEmail(userDTO.getEmail());

        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(hashedPassword);

        user.setBirthday(userDTO.getBirthday());
        user.setVisibility(userDTO.isVisibility());

        Users updatedUser = userRepository.save(user);
        return userMapper.toUserDetailDTO(updatedUser);
    }


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDetailDTO createUser(UserDetailDTO userDTO) {
        Users user = new Users();

        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());

        // VI HASHER PASSORDET!!
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(hashedPassword);

        user.setBirthday(userDTO.getBirthday());
        user.setVisibility(userDTO.isVisibility());

        Users savedUser = userRepository.save(user);
        return userMapper.toUserDetailDTO(savedUser);
    }

    public boolean validateUser(String username, String password) {
        Users user = userRepository.findByUsername(username);
        if (user == null) { return false; }

        // Vi kan sammenlikne passordet vi får av brukern, med det hashede passordet i databasen
        //ved hjelp av passwordEncoder.matches()
        return passwordEncoder.matches(password, user.getPassword());
    }

    public void deleteUser(String username) {
        if (!userRepository.existsById(username)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(username);
    }

}
