package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@PreAuthorize("hasRole('USER')")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("user")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PutMapping("quiz")
    public User setQuiz(@CurrentUser UserPrincipal userPrincipal, @RequestBody int quiz) {
        Optional<User> user = userRepository.findById(userPrincipal.getId());
        user.ifPresent(selectUser -> {
//            user.setQuiz
        });

        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PutMapping("character")
    public User setCharacter(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        return userService.updateUserCharacter(userPrincipal.getId(), user.getUserCharacter());
    }

    @PutMapping("nickname")
    public User setNickname(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        return userService.updateName(userPrincipal.getId(), user.getName());
    }

}
