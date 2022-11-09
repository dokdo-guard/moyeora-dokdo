package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Repository.BirdRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BirdService {

    private final BirdRepository birdRepository;
    public List<Bird> getAllBirds(){
        return birdRepository.findAll();
    }
    public Optional<Bird> getBird(String name){
        return  birdRepository.findBirdByName(name);
    }
}
