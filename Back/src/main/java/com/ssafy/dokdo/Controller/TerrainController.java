package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Entity.Terrain;
import com.ssafy.dokdo.Service.PlantService;
import com.ssafy.dokdo.Service.TerrainService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("info")
@AllArgsConstructor
public class TerrainController {

    private final TerrainService terrainService;
    @GetMapping("terrains")
    public List<Terrain> fetchAllPlants(){
        return terrainService.getAllTerrain();
    }
    @GetMapping("terrain")
    public Optional<Terrain> fetchPlant(@RequestParam("name") String name){
        return terrainService.getTerrain(name);
    }
}
