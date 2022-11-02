package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Visited;
import com.ssafy.dokdo.Repository.VisistedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VisitedService {

    private final VisistedRepository visistedRepository;


    public boolean checkVisited(Visited visited,String name){
        if(name.equals("biology")){
            if(visited.isBiology()){
                return true;
            }else
                return false;
        }
        else if(name.equals("history")){
            if(visited.isHistory()){
                return true;
            }else
                return false;
        }
        else if(name.equals("terrain")){
            if(visited.isTerrain()){
                return true;
            }else
                return false;
        }
        return false;
    }
    public void changeVisited(Visited visited,String name){
        if(name.equals("biology")){
            visited.setBiology(true);
        }
        else if(name.equals("history")){
            visited.setHistory(true);
        }
        else if(name.equals("terrain")){
            visited.setTerrain(true);
        }
        visistedRepository.save(visited);
    }

}

