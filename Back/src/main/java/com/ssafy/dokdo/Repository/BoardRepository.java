package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Board;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends MongoRepository<Board, String> {
//    @Query("db.orders.find().sort({"created_date": -1"}).skip((page-1)*20).limit(20)")
    @Aggregation(pipeline = {
            "{'$sort':  {'created_at':  -1}}",
            "{'$skip':  ?0}",
            "{'$limit':  20}"
    })
    List<Board> findN(int start);
}
