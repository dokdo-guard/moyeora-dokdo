package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Resource;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ResourceRepository extends MongoRepository<Resource, String> {
    Optional<Resource> findResourceByName(String name);
}
