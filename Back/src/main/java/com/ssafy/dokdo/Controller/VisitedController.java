package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Entity.Visited;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Repository.VisistedRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.BadgeService;
import com.ssafy.dokdo.Service.VisitedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/visited")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class VisitedController {

    private final VisistedRepository visistedRepository;
    private final VisitedService visitedService;

    @PutMapping
    public  ResponseEntity<Boolean> updateVisited(@CurrentUser UserPrincipal userPrincipal, @RequestParam String name){

            Optional<Visited> visited = visistedRepository.findVisitedById(userPrincipal.getId());

            if(!visited.isPresent()){
                return new ResponseEntity(false,HttpStatus.BAD_REQUEST);
            }
            else{
                visitedService.changeVisited(visited.get(),name);
                return new ResponseEntity(true,HttpStatus.OK);
            }
    }
    @GetMapping
    public ResponseEntity<Visited> getVisited(@CurrentUser UserPrincipal userPrincipal){

        try {
            Optional<Visited> visited = visistedRepository.findVisitedById(userPrincipal.getId());

            if(!visited.isPresent()){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            else
                return new ResponseEntity<>(visited.get(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("place")
    public ResponseEntity<Boolean> getVisited(@CurrentUser UserPrincipal userPrincipal,@RequestParam String name){


        try{
            Optional<Visited> visited = visistedRepository.findVisitedById(userPrincipal.getId());
        if(!visited.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else{
            Visited visit = visited.get();
            return new ResponseEntity<>(visitedService.checkVisited(visit,name),HttpStatus.OK);
        }}catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
