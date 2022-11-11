package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class BadgeController {
    private final BadgeService badgeService;

    @PostMapping("/badge")
    public ResponseEntity<?> savebadge(
            @CurrentUser UserPrincipal userPrincipal, @RequestBody Badge badge) {

        Long user_id = userPrincipal.getId();

        try{
            return new ResponseEntity<>(
                    badgeService.saveBadge(user_id, badge),
                    HttpStatus.OK);
        } catch (ResourceNotFoundException resourceNotFoundException){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
