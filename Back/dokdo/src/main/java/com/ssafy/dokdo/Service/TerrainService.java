package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Entity.Terrain;
import com.ssafy.dokdo.Repository.BirdRepository;
import com.ssafy.dokdo.Repository.TerrainRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TerrainService {

    private final TerrainRepository terrainRepository;
    public List<Terrain> getAllTerrain(){
        return terrainRepository.findAll();
    }
    public Optional<Bird> getBird(String name){
        return  terrainRepository.findTerrainByName();
    }
}
