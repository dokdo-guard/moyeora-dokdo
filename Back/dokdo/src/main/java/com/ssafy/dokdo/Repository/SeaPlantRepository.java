package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.SeaPlant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SeaPlantRepository extends MongoRepository<SeaPlant, String> {
    Optional<SeaPlant> findSeaPlantByName(String name);
}
