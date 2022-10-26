package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
<<<<<<< Back/dokdo/src/main/java/com/ssafy/dokdo/Repository/PlantRepository.java
@Repository
=======

public interface PlantRepository extends MongoRepository<Plant,String> {
    Optional<Plant> findPlantByName(String name);
}
