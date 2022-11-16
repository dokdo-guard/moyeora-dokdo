package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
}