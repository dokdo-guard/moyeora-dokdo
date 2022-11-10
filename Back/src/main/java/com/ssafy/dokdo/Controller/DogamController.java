package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("dogam")
@AllArgsConstructor
@PreAuthorize("hasRole('USER')")
public class DogamController {


    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping()
    public void saveDogam(@CurrentUser UserPrincipal userPrincipal,@RequestBody Map<String,Object> param){

        String domain = (String) param.get("domain");
        String mongo_id = (String) param.get("mongo_id");
        Long userId = userPrincipal.getId();



        boolean flag = userService.checkDogam(userId, domain, mongo_id);

        //도감 있으면 끝
        if(!flag){
            Dogam dogam = new Dogam();
            dogam.setDomain(domain);
            dogam.setMongo_id(mongo_id);
            dogam.setUser_id(userId);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

            user.getDogamList().add(dogam);
            dogamRepository.saveAndFlush(dogam);
        }

    }

}
