package com.react.Backend.Mappers;

import com.react.Backend.DTO.AdminUserDTO;
import com.react.Backend.DTO.PublicUserDTO;
import com.react.Backend.Entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    AdminUserDTO toAdminUserDTO(User user);

    PublicUserDTO toPublicUserDTO(User user);

}
