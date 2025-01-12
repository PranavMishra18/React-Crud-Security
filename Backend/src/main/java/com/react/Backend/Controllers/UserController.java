package com.react.Backend.Controllers;

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

    @GetMapping("/users")
    public List<User> getUsers(){

        return userService.getUsers();

    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){

        return userService.getUser(id);

    }

    @PostMapping("/user")
    public User createUser(@Valid @RequestBody User user){
        return userService.saveUser(user);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Long id,@Valid @RequestBody User newUser){

        User oldUser = userService.getUser(id);

        oldUser.setAge(newUser.getAge());
        oldUser.setUsername(newUser.getUsername());
        oldUser.setEmail(newUser.getEmail());

        return userService.saveUser(oldUser);

    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }


}
