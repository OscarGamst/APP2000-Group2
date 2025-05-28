package org.example.workoutapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.workoutapp.dto.UserBasicDTO;
import org.example.workoutapp.dto.UserDetailDTO;
import org.example.workoutapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// LISTE over ting som kan være greit å ha for Admin
// 1.Alle kommentarer på alle aktiviter
// 2.Alle kommentarer på en aktivitet
// 3.Slette Kommentarer
// 4.Slette aktiviter
// 5.Slette likes
// 6.Alle følgere (egentlig hele tabellen fra databasen)
// 7.Fjerne følgere

// litt inspirasjon fra OBJ, sånn ekstra hvis vi har tid
// Statistikk
// 1.Total antall users
// 2.Totalt antall Aktiviter
// 3.Totalt antall kommentarer
// 4.Users med flest følgere
// 5.Users med flest total antall likes
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/admin")
@Tag(name = "AdminUser Controller", description = "API for Admin controlling users")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    // ----------- ----------- ALT MED USER MANAGEMENT ----------- -----------
    @GetMapping("/user/basic")
    @Operation(summary = "Get all BasicUsers", description = "Retrieves a list of all users with basic information")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<UserBasicDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersBasic());
    }
    @GetMapping("/user/detailed")
    @Operation(summary = "Get all DetailedUsers", description = "Retrieves a list of all users with detailed information")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<UserDetailDTO>> getAllUsersDetailed() {
        return ResponseEntity.ok(userService.getAllUsersDetailed());
    }
    @PutMapping("/user/{username}")
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
    @PostMapping("/user/register")
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
    @DeleteMapping("/user/delete/{username}")
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
    // ----------- ----------- USER MANAGEMENT ----------- -----------
}