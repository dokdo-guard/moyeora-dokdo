package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.SeaPlant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface SeaPlantRepository extends MongoRepository<SeaPlant, String> {
    Optional<SeaPlant> findSeaPlantByName(String name);
}
