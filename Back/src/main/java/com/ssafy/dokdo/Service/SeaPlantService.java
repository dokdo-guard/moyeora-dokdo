package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Repository.SeaPlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SeaPlantService {
    private final SeaPlantRepository seaPlantRepository;

    public List<SeaPlant> getAllSeaPlants(){
        return seaPlantRepository.findAll();
    }

    public Optional<SeaPlant> getSeaPlant(String name){
        return seaPlantRepository.findSeaPlantByName(name);
    }
}
