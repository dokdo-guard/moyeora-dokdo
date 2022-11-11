package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Entity.QuizUser;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Model.UserDto;
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
    public UserDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getCurrentUser(userPrincipal.getId());
    }

    @GetMapping("quiz")
    public QuizUser getQuiz(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getQuizResult(userPrincipal.getId());
    }

    @PutMapping("quiz")
    public void setQuiz(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, Integer> body) {
        userService.updateQuizResult(userPrincipal.getId(), body.get("quiz"));
    }

    @PutMapping("character")
    public void setCharacter(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        userService.updateUserCharacter(userPrincipal.getId(), user.getUserCharacter());
    }

    @PostMapping("check/nickname")
    public void checkNickName(@RequestBody Map<String, String> body){
        userService.checkNickName(body.get("name"));
    }

    @PutMapping("nickname")
    public void setNickname(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        userService.updateName(userPrincipal.getId(), user.getName());
    }

    //domain별로 조회되도록 수정(성령)
//    @GetMapping("/user/dogams")
//    public ResponseEntity<?> getDogamList(@CurrentUser UserPrincipal userPrincipal, @RequestParam String domain){
//        try{
//            return new ResponseEntity<>(
//                    userService.getDogamList(userPrincipal.getId(), domain),
//                    HttpStatus.OK);
//        } catch (NoSuchElementException noSuchElementException){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/user/dogams/plant")
    public ResponseEntity<?> getPlantDogam(@CurrentUser UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(
                    userService.getPlantDogam(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/badge")
    public List<Badge> getAllBadges(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getAllBadges(userPrincipal.getId());
    }

    @GetMapping("/user/dogam")
    public ResponseEntity<Boolean> getDogamList(@CurrentUser UserPrincipal userPrincipal, @RequestParam String domain, @RequestParam(name = "mongo_id") String mongoId){
        try{
            return new ResponseEntity<>(
                    userService.checkDogam(userPrincipal.getId(), domain, mongoId),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
