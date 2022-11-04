package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Visited;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitedRepository extends JpaRepository<Visited,String> {
}
