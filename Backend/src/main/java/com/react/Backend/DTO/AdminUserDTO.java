package com.react.Backend.DTO;

import com.react.Backend.Entities.Country;
import com.react.Backend.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUserDTO {

    Long id;
    String username;
    String email;
    String password;
    int age;
    Role role;
    Country country;
}
