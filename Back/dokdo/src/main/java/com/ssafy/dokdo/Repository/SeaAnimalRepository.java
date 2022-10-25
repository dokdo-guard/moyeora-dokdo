package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.SeaAnimal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SeaAnimalRepository extends MongoRepository<SeaAnimal, String> {
    Optional<SeaAnimal> findSeaAnimalByName(String name);
}
