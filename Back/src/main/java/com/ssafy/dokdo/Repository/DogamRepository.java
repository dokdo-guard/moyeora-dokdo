package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Badge;
import com.ssafy.dokdo.Entity.Dogam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DogamRepository extends JpaRepository<Dogam, String> {
}
