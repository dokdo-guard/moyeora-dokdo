package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Repository.BirdRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BirdService {

    private final Logger logger = LoggerFactory.getLogger(BirdService .class);
    private final BirdRepository birdRepository;
    public List<Bird> getAllBirds(){
        logger.info("getAllBirds");
        return birdRepository.findAll();
    }
    public Optional<Bird> getBird(String name){
        logger.info("name: "+name);
        return  birdRepository.findBirdByName(name);
    }
}
