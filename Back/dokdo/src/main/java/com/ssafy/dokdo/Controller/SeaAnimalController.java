package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Service.SeaAnimalService;
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
public class SeaAnimalController {

    private final SeaAnimalService seaAnimalService;

    @GetMapping("/sea-animals")
    public List<SeaAnimal> getAllSeaAnimals(){
        return seaAnimalService.getAllSeaAnimals();
    }

    @GetMapping("/sea-animal")
    public Optional<SeaAnimal> getSeaAnimal(@RequestParam String name){
        return seaAnimalService.getSeaAnimal(name);
    }
}
