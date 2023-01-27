package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.QuizUser;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Entity.UserBadge;
import com.ssafy.dokdo.Model.UserDto;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@PreAuthorize("hasRole('USER')")
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    // Todo: 내가 수정
    @GetMapping()
    public UserDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        logger.info("getCurrentUser - name: " + userPrincipal.getUsername());
        return userService.getCurrentUser(userPrincipal.getId());
    }

    @GetMapping("/quiz")
    public QuizUser getQuiz(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getQuizResult(userPrincipal.getId());
    }

    @PutMapping("/quiz")
    public void setQuiz(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, Integer> body) {
        userService.updateQuizResult(userPrincipal.getId(), body.get("quiz"));
    }

    @GetMapping("/badge")
    public UserBadge getUserBadge(@CurrentUser UserPrincipal userPrincipal) {
        return userService.getUserBadge(userPrincipal.getId());
    }

    @PostMapping("/badge")
    public void setUserBadge(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, String> body) {
        userService.updateUserBadge(userPrincipal.getId(), body.get("badge"));
    }

    @PutMapping("/character")
    public void setCharacter(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        userService.updateUserCharacter(userPrincipal.getId(), user.getUserCharacter());
    }

    @PostMapping("/check/nickname")
    public Boolean checkNickName(@RequestBody Map<String, String> body){
        return userService.checkNickName(body.get("name"));
    }

    @PutMapping("/nickname")
    public void setNickname(@CurrentUser UserPrincipal userPrincipal, @RequestBody User user) {
        userService.updateName(userPrincipal.getId(), user.getName());
    }

    // Todo: 내가 수정
    @PutMapping("/first-visit")
    public void updateFirstVisit(@CurrentUser UserPrincipal userPrincipal){
        logger.info("updateFirstVisit");
        userService.updateFirstVisit(userPrincipal.getId());
    }

    @GetMapping("/dogams/plant")
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

    @GetMapping("/dogams/bird")
    public ResponseEntity<?> getBirdDogam(@CurrentUser UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(
                    userService.getBirdDogam(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dogams/sea-plant")
    public ResponseEntity<?> getSeaPlantDogam(@CurrentUser UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(
                    userService.getSeaPlantDogam(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dogams/sea-animal")
    public ResponseEntity<?> getSeaAnimalDogam(@CurrentUser UserPrincipal userPrincipal){
        try{
            return new ResponseEntity<>(
                    userService.getSeaAnimalDogam(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/dogam")
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

    @PostMapping("/talk")
    public ResponseEntity<?> saveNpcTalk(@CurrentUser UserPrincipal userPrincipal, @RequestBody Map<String, String> npcName) {
        try{
            return new ResponseEntity<>(
                    userService.saveNpcTalk(userPrincipal.getId(), npcName.get("name")),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/talk")
    public ResponseEntity<?> getNpcTalk(@CurrentUser UserPrincipal userPrincipal) {
        try{
            return new ResponseEntity<>(
                    userService.getNpcTalk(userPrincipal.getId()),
                    HttpStatus.OK);
        } catch (NoSuchElementException noSuchElementException) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
