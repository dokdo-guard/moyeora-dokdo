package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, String> {
}
