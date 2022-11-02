package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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
    public ResponseEntity<?> setQuiz(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, Integer> body) {
        try{
            return new ResponseEntity<>(
                    userService.updateQuizResult(userPrincipal.getId(), body.get("quiz")),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("character")
    public ResponseEntity<?> setCharacter(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        try{
            return new ResponseEntity<>(
                userService.updateUserCharacter(userPrincipal.getId(), user.getUserCharacter()),
                HttpStatus.OK);
        } catch (ResourceNotFoundException resourceNotFoundException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("nickname")
    public ResponseEntity<?> setNickname(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        try{
            return new ResponseEntity<>(
                    userService.updateName(userPrincipal.getId(), user.getName()),
                    HttpStatus.OK);
        } catch (ResourceNotFoundException resourceNotFoundException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/dogam")
    public List<Dogam> getDogamList(@CurrentUser UserPrincipal userPrincipal){
        return userService.getDogamList(userPrincipal.getId());
    }

}
