package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Resource;
import com.ssafy.dokdo.Entity.SeaAnimal;
import com.ssafy.dokdo.Service.ResourceService;
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
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping("/resources")
    public List<Resource> getAllResources(){
        return resourceService.getAllResources();
    }

    @GetMapping("/resource")
    public Optional<Resource> getResource(@RequestParam String name){
        return resourceService.getResource(name);
    }
}
