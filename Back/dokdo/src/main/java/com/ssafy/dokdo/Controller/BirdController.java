package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Service.BirdService;
import com.ssafy.dokdo.Service.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@AllArgsConstructor
public class BirdController {

    private final BirdService birdService;
    @GetMapping("birds")
    public List<Bird> fetchAllPlants(){
        return birdService.getAllBirds();
    }
    @GetMapping("bird")
    public Optional<Bird> fetchPlant(@RequestParam(value = "name") String name){
        return birdService.getBird(name);
    }
}
