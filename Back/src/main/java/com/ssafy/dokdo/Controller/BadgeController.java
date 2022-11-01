package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Model.BadgeDto;
import com.ssafy.dokdo.Service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class BadgeController {

    private final String success = "SUCCESS";
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final BadgeService badgeService;


    @GetMapping("/badge")
    public Map<String, Object> getAllBadges() {
        Map<String, Object> result = new HashMap<>();
        List<BadgeDto> badgeList = new ArrayList<>();

        try{
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Long user_id = user.getId();  //사용자의 id를 가져온다

            badgeList = badgeService.getAllBadges(user_id);

            if(badgeList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }

        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", badgeList);
        return result;
    }
}
