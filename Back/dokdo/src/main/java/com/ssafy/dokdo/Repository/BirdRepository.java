package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Entity.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface BirdRepository extends MongoRepository<Bird,String> {
    Optional<Bird> findBirdByName(String name);
}
