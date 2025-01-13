package com.react.Backend.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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


    @NotNull(message = "Username Cannot be empty.")
    @NotBlank(message = "Username Cannot be empty")
    String username;


    @NotNull(message = "Email Cannot be empty.")
    @NotBlank(message = "Email Cannot be empty")
    @Email
    @Column(unique = true)
    String email;


    @NotNull(message = "Cannot be empty.")
    int age;

    @NotNull(message = "Password Cannot be empty.")
    @NotBlank(message = "Password Cannot be empty")
    String password;

    @Enumerated(EnumType.STRING)
    Role role;


    @ManyToOne
    @JoinColumn(name = "country_id")
            @JsonManagedReference
    Country country;

}
