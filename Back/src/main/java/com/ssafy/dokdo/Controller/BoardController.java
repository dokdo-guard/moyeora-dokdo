package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Model.BoardDto;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    @GetMapping
    public List<Board> getAllCard() {
        return boardService.getAllBoards();
    }

    @PostMapping
    public void postCard(@CurrentUser UserPrincipal userPrincipal, @RequestBody BoardDto board){
        boardService.postBoard(userPrincipal.getUsername(), board);
    }
}
