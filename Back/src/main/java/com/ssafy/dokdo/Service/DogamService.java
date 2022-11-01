package com.ssafy.dokdo.Service;


import com.ssafy.dokdo.Entity.Dogam;
import com.ssafy.dokdo.Repository.DogamRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DogamService {

    private final DogamRepository dogamRepository;
    public List<Dogam> getAllDogams(String user_id){return  dogamRepository.findAllByUser_Id(user_id);}
    public void saveDogam(Dogam dogam){
         dogamRepository.save(dogam);
    }

}
