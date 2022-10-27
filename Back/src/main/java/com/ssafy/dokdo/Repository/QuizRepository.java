package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuizRepository extends MongoRepository<Quiz,String> {
}
