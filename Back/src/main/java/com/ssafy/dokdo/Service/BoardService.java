package com.ssafy.dokdo.Service;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Exception.BadRequestException;
import com.ssafy.dokdo.Model.BoardDto;
import com.ssafy.dokdo.Repository.BoardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public List<Board> getAllBoards(){
        return boardRepository.findAll();
    }

    public List<Board> get20NBoards(int page) {
        return boardRepository.findN((page-1) * 20);
    }


    public void postBoard(String name, BoardDto boardDto){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd");
        if(boardDto.getContent()==null){
            throw new BadRequestException("내용을 입력해 주세요.");
        }
        Board board = Board.builder()
                .writer(name).content(boardDto.getContent()).image_url(boardDto.getImage_url())
                .created_at(simpleDateFormat.format(new Date())).build();
        boardRepository.save(board);
    }
    public void deleteBoard(String cardId){
        boardRepository.deleteById(cardId);
    }

    public void updateBoard(String cardId, BoardDto boardDto) {
        Board board = boardRepository.findById(cardId)
                .orElseThrow(()-> new IllegalArgumentException("No such data"));
        board.setContent(boardDto.getContent());
        board.setImage_url(board.getImage_url());
        boardRepository.save(board);
    }
}
