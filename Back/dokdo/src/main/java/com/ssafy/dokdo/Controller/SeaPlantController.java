package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Service.SeaPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class SeaPlantController {

    private final SeaPlantService seaPlantService;

    @GetMapping("/sea-plants")
    public List<SeaPlant> getAllSeaPlants(){
        return seaPlantService.getAllSeaPlants();
    }

    @GetMapping("/sea-plant")
    public Optional<SeaPlant> getSeaPlant(@RequestParam String name){
        return seaPlantService.getSeaPlant(name);
    }
}
