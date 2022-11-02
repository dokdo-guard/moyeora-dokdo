package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Model.BadgeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, String> {
    List<BadgeDto> findBadgesById(Long id);
}
