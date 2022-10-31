package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Board;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends MongoRepository<Board, Long> {
}
