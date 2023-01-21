package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Model.BoardDto;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    @GetMapping
    public List<Board> getAllCards() {
        logger.info("getAllCards");
        return boardService.getAllBoards();
    }

    @PostMapping
    public void postCard(@CurrentUser UserPrincipal userPrincipal, @RequestBody BoardDto board){
        logger.info("post new Card");
        boardService.postBoard(userPrincipal.getUsername(), board);
    }

    @DeleteMapping
    public void deleteCard(@CurrentUser UserPrincipal userPrincipal, @PathVariable String cardId){
        logger.info("delete Card");
        boardService.deleteBoard(cardId);
    }
}
