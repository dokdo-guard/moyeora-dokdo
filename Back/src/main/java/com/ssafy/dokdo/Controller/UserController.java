package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
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

    private final UserService userService;

    @GetMapping("user")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        try{
            return new ResponseEntity<>(
                    userService.getCurrentUser(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (ResourceNotFoundException resourceNotFoundException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
            // 게시판 닉네임 변경 로직...??
            return new ResponseEntity<>(
                    userService.updateName(userPrincipal.getId(), user.getName()),
                    HttpStatus.OK);
        } catch (ResourceNotFoundException resourceNotFoundException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/dogams")
    public ResponseEntity<?> getDogamList(@CurrentUser UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(
                    userService.getDogamList(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/badge")
    public ResponseEntity<?> getAllBadges(@CurrentUser UserPrincipal userPrincipal) {

        try{
            return new ResponseEntity<>(
                    userService.getAllBadges(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/dogam")
    public ResponseEntity<Boolean> getDogamList(@CurrentUser UserPrincipal userPrincipal, @RequestParam String domain, @RequestParam(name = "mongo_id") String mongoId){
        try{
            return new ResponseEntity<>(
                    userService.checkDogam(userPrincipal.getId(),domain,mongoId),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
