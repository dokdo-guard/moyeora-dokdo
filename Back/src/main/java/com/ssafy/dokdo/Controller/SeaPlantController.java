package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Service.SeaPlantService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("info")
@CrossOrigin("*")
public class SeaPlantController {

    private final SeaPlantService seaPlantService;

    @ApiOperation(value = "해조류 목록 조회", notes = "해조류 목록의 상세 정보를 조회한다.")
    @GetMapping("sea-plants")
    public List<SeaPlant> getAllSeaPlants(){
        return seaPlantService.getAllSeaPlants();
    }

    @ApiOperation(value = "해조류 조회", notes = "해조류 하나의 상세 정보를 조회한다.")
    @GetMapping("sea-plant")
    public Optional<SeaPlant> getSeaPlant(
            @RequestParam @ApiParam("해당 해조류의 상세 정보를 불러온다.") String name){
        return seaPlantService.getSeaPlant(name);
    }
}
