package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Visited;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VisistedRepository extends JpaRepository<Visited, String> {

    Optional<Visited> findVisitedById(Long id);
}
