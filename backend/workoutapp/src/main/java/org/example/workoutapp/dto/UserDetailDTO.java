package org.example.workoutapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserDetailDTO {
    private String username;
    private String email;
    private String password;
    private LocalDate birthday;
    private boolean visibility;
}
