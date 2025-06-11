package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.UserBasicDTO;
import org.example.workoutapp.dto.UserDetailDTO;
import org.example.workoutapp.dto.UserNoPwDTO;
import org.example.workoutapp.mapper.UserMapper;
import org.example.workoutapp.model.Users;
import org.example.workoutapp.repository.UserRepository;
import org.example.workoutapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/users")
@Tag(name = "User Controller", description = "API for normal users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves a list of all users with basic information")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<UserBasicDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersBasic());
    }
    @PutMapping("/{username}")
    @Operation(summary = "Update a user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user data"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<UserDetailDTO> updateUser(
            @PathVariable String username,
            @Valid @RequestBody UserDetailDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(username, userDTO));
    }
    @PutMapping("/update-no-pw/{username}")
    @Operation(summary = "Update a user, without password")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user data"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<UserNoPwDTO> updateUserNoPw(
            @PathVariable String username,
            @Valid @RequestBody UserNoPwDTO userNoPwDTO) {
        return ResponseEntity.ok(userService.updateWithoutPassword(username, userNoPwDTO));
    }
    @PostMapping("/register")
    @Operation(summary = "Create a new user")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User created successfulyy"),
            @ApiResponse(responseCode = "400", description = "Invalid user Data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<UserDetailDTO> createUser(@Valid @RequestBody UserDetailDTO userDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDTO));
    }
    @DeleteMapping("/delete/{username}")
    @Operation(summary = "Delete user")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    @Operation(summary = "Validate user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid user data"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<?> validateUser(@RequestBody UserDetailDTO userDTO) {
        //får inn en true eller false her hvis brukern er gyldig eller ikke
        boolean isValid = userService.validateUser(userDTO.getUsername(), userDTO.getPassword());

        //Hvis den ikke er gyldig - dvs feil login credentials
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user credentials");
        }

        //hvis den er gyldig / aka brukernavn og passord er riktig -
        Users user = userRepository.findByUsername(userDTO.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        //hvis den kommer seg forbi de to sjekkene over, sender
        //vi en ny DTO men bare uten passordet.
        UserDetailDTO userResponseDTO = userMapper.toUserDetailDTO(user);
        userResponseDTO.setPassword(null); //VIKTIG å ikke returnere passordet også!!

        return ResponseEntity.ok(userResponseDTO);
    }

    @GetMapping("/search/{username}")
    @Operation(summary = "Get all users like the search", description = "Retrieves users with basic information search")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<UserBasicDTO>> getAllUsersWithSearch(@PathVariable String username) {
        return ResponseEntity.ok(userService.getAllUsersLike(username));
    }

    @GetMapping("/getUser/{username}")
    @Operation(summary = "Get user", description = "Get user by username")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<UserBasicDTO> getUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUser(username));
    }


}
