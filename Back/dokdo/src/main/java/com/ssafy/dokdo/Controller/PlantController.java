package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Service.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@AllArgsConstructor
public class PlantController {

    private final PlantService plantService;
    @GetMapping("plants")
    public List<Plant> fetchAllPlants(){
        return plantService.getAllPlants();
    }
    @GetMapping("plant")
    public Optional<Plant> fetchPlant(@RequestParam("name") String name){
        return plantService.getPlant(name);
    }
}
