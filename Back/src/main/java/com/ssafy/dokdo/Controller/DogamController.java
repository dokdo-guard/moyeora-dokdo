package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Service.DogamService;
import com.ssafy.dokdo.Service.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("dogam")
@AllArgsConstructor
public class DogamController {


    private final DogamService dogamService;
//    @GetMapping
//    public List<Plant> fetchAllPlants(){
//        return dogamService.getAllDogams();
//    }

}
