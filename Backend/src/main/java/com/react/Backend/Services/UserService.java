package com.react.Backend.Services;

import com.react.Backend.DTO.AdminUserDTO;
import com.react.Backend.DTO.PublicUserDTO;
import com.react.Backend.Entities.User;
import com.react.Backend.Mappers.UserMapper;
import com.react.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    @Autowired
    private final UserMapper userMapper = UserMapper.INSTANCE;



    public List<AdminUserDTO> getAdminDTOUsers(){

        return userRepository.findAll()
                .stream()
                .map(userMapper::toAdminUserDTO)
                .collect(Collectors.toList());

    }

    public List<AdminUserDTO> getAdminDTOUsersByCountry(String countryName){

        return userRepository.findByCountryName(countryName)
                .stream()
                .map(userMapper::toAdminUserDTO)
                .collect(Collectors.toList());

    }

    public List<PublicUserDTO> getPublicDTOUsers(){

        return userRepository.findAll()
                .stream()
                .map(userMapper::toPublicUserDTO)
                .collect(Collectors.toList());

    }

    public User getUser(Long id){
        return userRepository.findById(id).get();
    }

    public void deleteUser(Long id){

        User user = userRepository.findById(id).get();
        userRepository.delete(user);

    }



}
