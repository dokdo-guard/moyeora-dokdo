package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Repository.PlantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PlantService {

    private final PlantRepository plantRepository;
    public List<Plant> getAllPlants(){
        return plantRepository.findAll();
    }
    public Optional<Plant> getPlant(String name){
        return  plantRepository.findPlantByName(name);
    }
}
