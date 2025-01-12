package com.react.Backend.Entities;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;


    @NotNull(message = "Cannot be empty.")
    @NotBlank(message = "Cannot be empty")
    String username;


    @NotNull(message = "Cannot be empty.")
    @NotBlank(message = "Cannot be empty")
    @Email
    @Column(unique = true)
    String email;


    @NotNull(message = "Cannot be empty.")
    int age;


}
