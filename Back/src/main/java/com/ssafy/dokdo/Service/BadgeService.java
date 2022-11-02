package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Repository.BadgeRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BadgeService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;

    public Badge saveBadge(Long id, Badge badge) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        user.getBadgeList().add(badge);
        System.out.println(badge);
        return badgeRepository.saveAndFlush(badge);

    }

}
