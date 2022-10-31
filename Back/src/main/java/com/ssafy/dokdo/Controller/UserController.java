package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user-info")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}
