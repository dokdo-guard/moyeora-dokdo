package com.ssafy.dokdo.Controller;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Model.BoardDto;
import com.ssafy.dokdo.Security.CurrentUser;
import com.ssafy.dokdo.Security.UserPrincipal;
import com.ssafy.dokdo.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    @GetMapping
    public List<Board> getAllCard(){
        return boardService.getAllBoards();
    }

    @PostMapping
    public void postCard(@CurrentUser UserPrincipal userPrincipal, @RequestBody BoardDto boardDto){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String strNowDate = simpleDateFormat.format(new Date());

        Board board = new Board();
        board.setWriter(userPrincipal.getName());
        board.setContent(boardDto.getContent());
        board.setImage_url(boardDto.getImage_url());
        board.setCreated_at(strNowDate);

        boardService.postBoard(board);
    }
}
