package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Repository.BoardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

    public void postBoard(Board board){
        boardRepository.save(board);
    }

//    public Optional<Board> getBoard(String name){
//        return boardRepository.findBoardByName(name);
//    }

//    public List<Board> getRecent50(){
//        return boardRepository.findTop50OrderByIdDesc();
//    }
}
