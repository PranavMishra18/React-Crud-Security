package com.react.Backend.Controllers;

import com.react.Backend.DTO.AdminUserDTO;
import com.react.Backend.DTO.PublicUserDTO;
import com.react.Backend.Entities.User;
import com.react.Backend.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    public UserService userService;

    @GetMapping("/hello")
    public String test() {
        return "hello";
    }

    @GetMapping("/authenticated")
    public String test2() {
        return "I am authenticated";
    }

    @GetMapping("/public/users")
    public List<PublicUserDTO> getPublicUsers(){

        return userService.getPublicDTOUsers();

    }

    @GetMapping("/admin/users")
    public List<AdminUserDTO> getAdminUsers(){
        return userService.getAdminDTOUsers();
    }

    @GetMapping("/admin/users/{country}")
    public List<AdminUserDTO> getAdminUsers(@PathVariable String country){
        return userService.getAdminDTOUsersByCountry(country);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){

        return userService.getUser(id);

    }


    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }


}
