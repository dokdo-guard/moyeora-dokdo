package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Resource;
import com.ssafy.dokdo.Repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public List<Resource> getAllResources(){
        return resourceRepository.findAll();
    }

    public Optional<Resource> getResource(String name){
        return resourceRepository.findResourceByName(name);
    }
}
