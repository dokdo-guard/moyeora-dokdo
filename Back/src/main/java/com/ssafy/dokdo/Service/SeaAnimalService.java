package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Repository.SeaAnimalRepository;
import com.ssafy.dokdo.Repository.SeaPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SeaAnimalService {

    private final SeaAnimalRepository seaAnimalRepository;

    public List<SeaAnimal> getAllSeaAnimals(){
        return seaAnimalRepository.findAll();
    }

    public Optional<SeaAnimal> getSeaAnimal(String name){
        return seaAnimalRepository.findSeaAnimalByName(name);
    }
}
