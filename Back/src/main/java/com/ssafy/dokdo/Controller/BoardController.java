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
    public List<Board> getAllBoards() {
        List<Board> ret = boardService.getAllBoards();
        logger.info("getAllBoards - cnt: " + ret.size());
        return ret;
    }

    @GetMapping("/{page}")
    public List<Board> get20NBoards(@PathVariable int page) {
        List<Board> ret = boardService.get20NBoards(page);
        logger.info(String.format("get20NBoards - from %d to %d", (page-1)*20 + 1, page*20));
        return ret;
    }

    @PostMapping
    public void postCard(@CurrentUser UserPrincipal userPrincipal, @RequestBody BoardDto board){
        logger.info("postCard - user: " + userPrincipal.getUsername());
        boardService.postBoard(userPrincipal.getUsername(), board);
    }

    @PutMapping("/{cardId}")
    public void updateCard(@CurrentUser UserPrincipal userPrincipal, @PathVariable String cardId, @RequestBody BoardDto board){
        logger.info("updateCard - card_id: " + cardId);
        boardService.updateBoard(cardId, board);
    }

    @DeleteMapping("/{cardId}")
    public void deleteCard(@CurrentUser UserPrincipal userPrincipal, @PathVariable String cardId){
        logger.info("deleteCard - card_id: " + cardId);
        boardService.deleteBoard(cardId);
    }
}
