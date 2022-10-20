package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Service.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("plant")
@AllArgsConstructor
public class PlantController {

    private final PlantService plantService;
    @GetMapping
    public List<Plant> fetchAllPlants(){
        return plantService.getAllPlants();
    }
    @GetMapping("/{name}")
    public Optional<Plant> fetchPlant(@PathVariable String name){
        return plantService.getPlant(name);
    }
}
