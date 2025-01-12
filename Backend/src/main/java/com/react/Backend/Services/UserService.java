package com.react.Backend.Services;

import com.react.Backend.Entities.User;
import com.react.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUser(Long id){
        return userRepository.findById(id).get();
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long id){

        User user = userRepository.findById(id).get();
        userRepository.delete(user);

    }
}
