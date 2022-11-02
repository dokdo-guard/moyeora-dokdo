package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("dogam")
@AllArgsConstructor
public class DogamController {


    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;

    @PostMapping()
    public void saveDogam(@CurrentUser UserPrincipal userPrincipal,@RequestBody Dogam dogam){

        Long userId = userPrincipal.getId();

        dogam.setUser_id(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        user.getDogamList().add(dogam);
        System.out.println(dogam);
        dogamRepository.saveAndFlush(dogam);
    }

}
