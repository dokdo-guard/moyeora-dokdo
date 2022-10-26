package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Resource;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ResourceRepository extends MongoRepository<Resource, String> {
    Optional<Resource> findResourceByName(String name);
}
