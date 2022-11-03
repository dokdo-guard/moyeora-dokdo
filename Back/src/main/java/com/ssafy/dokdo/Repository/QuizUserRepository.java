package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.QuizUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizUserRepository extends JpaRepository<QuizUser,String> {
    Optional<QuizUser> findById(Long id);
}
