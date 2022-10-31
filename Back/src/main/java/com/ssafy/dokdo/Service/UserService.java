package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {
    private UserRepository userRepository;

    public User updateUserCharacter(Long id, String userCharacter){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setUserCharacter(userCharacter);
        return userRepository.save(user);
    }

    public User updateName(Long id, String name){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        user.setName(name);
        return userRepository.save(user);
    }
}
