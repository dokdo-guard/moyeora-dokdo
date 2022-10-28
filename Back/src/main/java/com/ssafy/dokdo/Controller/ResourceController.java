package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Resource;
import com.ssafy.dokdo.Service.ResourceService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("info")
public class ResourceController {

    private final ResourceService resourceService;

    @ApiOperation(value = "자원 목록 조회", notes = "자원 목록의 상세 정보를 조회한다.")
    @GetMapping("resources")
    public List<Resource> getAllResources(){
        return resourceService.getAllResources();
    }

    @ApiOperation(value = "자원 조회", notes = "자원 하나의 상세 정보를 조회한다.")
    @GetMapping("resource")
    public Optional<Resource> getResource(
            @RequestParam @ApiParam("해당 자원의 상세 정보를 불러온다.") String name){
        return resourceService.getResource(name);
    }
}
