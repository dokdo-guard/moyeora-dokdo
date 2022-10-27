package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.SeaAnimal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SeaAnimalRepository extends MongoRepository<SeaAnimal, String> {
    Optional<SeaAnimal> findSeaAnimalByName(String name);
}
