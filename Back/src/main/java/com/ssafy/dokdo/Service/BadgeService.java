package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Model.BadgeDto;
import com.ssafy.dokdo.Repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;

    public List<BadgeDto> getAllBadges(Long id) {
        return badgeRepository.findBadgesById(id);
    }
}
