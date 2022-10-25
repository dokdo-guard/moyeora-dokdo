package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface PlantRepository extends MongoRepository<Plant,String> {
    Optional<Plant> findPlantByName(String name);
}
