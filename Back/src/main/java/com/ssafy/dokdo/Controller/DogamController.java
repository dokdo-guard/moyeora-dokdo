package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.*;
import com.ssafy.dokdo.Exception.ResourceNotFoundException;
import com.ssafy.dokdo.Model.AllSpecies;
import com.ssafy.dokdo.Repository.DogamRepository;
import com.ssafy.dokdo.Repository.UserRepository;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.*;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("dogam")
@AllArgsConstructor
@PreAuthorize("hasRole('USER')")
public class DogamController {


    private final DogamRepository dogamRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final PlantService plantService;
    private final SeaAnimalService seaAnimalService;
    private final BirdService birdService;
    private final SeaPlantService seaPlantService;
    private final DogamService dogamService;

    @PostMapping()
    public void saveDogam(@CurrentUser UserPrincipal userPrincipal,@RequestBody Map<String,Object> param){

        String domain = (String) param.get("domain");
        String mongo_id = (String) param.get("mongo_id");
        Long userId = userPrincipal.getId();



        boolean flag = userService.checkDogam(userId, domain, mongo_id);

        //도감 있으면 끝
        if(!flag){
            Dogam dogam = new Dogam();
            dogam.setDomain(domain);
            dogam.setMongo_id(mongo_id);
            dogam.setUser_id(userId);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

            user.getDogamList().add(dogam);
            dogamRepository.saveAndFlush(dogam);
        }
    }

    @GetMapping("random")
    public HashSet<AllSpecies> getAllDogam(@RequestParam int number) {
        List<Plant> plantList = plantService.getAllPlants();
        List<SeaAnimal> seaAnimalList = seaAnimalService.getAllSeaAnimals();
        List<Bird> birdList = birdService.getAllBirds();
        List<SeaPlant> seaPlantList = seaPlantService.getAllSeaPlants();

        //분류 4개 set으로 합치기
        List<Object> allDogamList = new ArrayList<>();
        allDogamList.addAll(plantList);
        allDogamList.addAll(seaAnimalList);
        allDogamList.addAll(birdList);
        allDogamList.addAll(seaPlantList);

        return dogamService.getDogamByNumber(allDogamList, number);

    }


}
