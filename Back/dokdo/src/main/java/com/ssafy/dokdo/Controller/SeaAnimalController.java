package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Service.SeaAnimalService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

    @ApiOperation(value = "해양동물 목록 조회", notes = "해양동물 목록의 상세 정보를 조회한다.")
    @GetMapping("/sea-animals")
    public List<SeaAnimal> getAllSeaAnimals(){
        return seaAnimalService.getAllSeaAnimals();
    }

    @ApiOperation(value = "해양동물 조회", notes = "해양동물 하나의 상세 정보를 조회한다.")
    @GetMapping("/sea-animal")
    public Optional<SeaAnimal> getSeaAnimal(
            @RequestParam @ApiParam("해당 해양동물의 상세 정보를 불러온다.") String name){
        return seaAnimalService.getSeaAnimal(name);
    }
}
