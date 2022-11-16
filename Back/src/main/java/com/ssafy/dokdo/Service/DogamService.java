package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Bird;
import com.ssafy.dokdo.Entity.Plant;
import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Entity.SeaPlant;
import com.ssafy.dokdo.Model.AllSpecies;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@AllArgsConstructor
@Service
public class DogamService {

    public HashSet<AllSpecies> getDogamByNumber(List<Object> allDogamList, int number) {
        HashSet<AllSpecies> randomDogam = new HashSet<>();

        long seed = System.currentTimeMillis();
        Random rand = new Random(seed);

        while(randomDogam.size() < number){
            int randomIndex = rand.nextInt(allDogamList.size());
            Object randomElement = allDogamList.get(randomIndex);

            if(randomElement instanceof Bird){
                Bird tmp = (Bird)randomElement;
                randomDogam.add(new AllSpecies(tmp.getName(), tmp.getDomain(),tmp.getImg()));
            }else if(randomElement instanceof Plant){
                Plant tmp = (Plant)randomElement;
                randomDogam.add(new AllSpecies(tmp.getName(), tmp.getDomain(), tmp.getImg()));
            }else if(randomElement instanceof SeaAnimal){
                SeaAnimal tmp = (SeaAnimal) randomElement;
                randomDogam.add(new AllSpecies(tmp.getName(), tmp.getDomain(), tmp.getImg()));
            }else if(randomElement instanceof SeaPlant){
                SeaPlant tmp = (SeaPlant) randomElement;
                randomDogam.add(new AllSpecies(tmp.getName(), tmp.getDomain(), tmp.getImg()));
            }
        }
        return  randomDogam;
    }
}
