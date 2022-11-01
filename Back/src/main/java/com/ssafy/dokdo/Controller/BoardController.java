package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Service.BoardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("board")
public class BoardController {
    private final BoardService boardService;
}
