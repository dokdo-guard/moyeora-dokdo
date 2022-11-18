package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Entity.User;
import com.ssafy.dokdo.Model.BoardDto;
import com.ssafy.dokdo.Model.UserDto;
import com.ssafy.dokdo.Repository.BoardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

    public void postBoard(String name, BoardDto boardDto){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Board board = new Board();
        board.setWriter(name);
        board.setContent(boardDto.getContent());
        board.setImage_url(boardDto.getImage_url());
        board.setCreated_at(simpleDateFormat.format(new Date()));
        boardRepository.save(board);
    }
}
