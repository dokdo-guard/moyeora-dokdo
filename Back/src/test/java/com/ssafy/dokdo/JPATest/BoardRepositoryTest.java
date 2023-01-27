package com.ssafy.dokdo.JPATest;

import com.ssafy.dokdo.Entity.Board;
import com.ssafy.dokdo.Exception.BadRequestException;
import com.ssafy.dokdo.Repository.BoardRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest // DB와 관련된 컴포넌트만 메모리에 로딩
//@Import(BoardRepository.class)
//@SpringBootTest // @Entity가 아니면 오류가 날 수 있다. 차라리 SpringBootTest를 사용한다.
@EnableJpaRepositories("com.ssafy.dokdo.Repository.BoardRepository")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DisplayName("Board Repository test case")
public class BoardRepositoryTest {
    @Autowired
    private BoardRepository boardRepository;

    @BeforeAll
    static void initAll(){
        System.out.println("initAll()");
    }

    @BeforeEach
    void init(){
        System.out.println("init()");
    }

    @Test
    void getCardsTest(){
        int n = 10;
        for(int i=0; i<n; i++){
            boardRepository.save(Board.builder()
                    .writer("테스트" + (i + 1))
                    .content("테스트 컨텍스트" + (i + 1))
                    .created_at("2022.02.22")
                    .build());
        }
        List<Board> boardList = boardRepository.findAll();

        assertEquals(n, boardList.size());
        for(int i=1; i<n; i++){
            assertNotEquals(boardList.get(i-1).getId(), boardList.get(i).getId());
        }
    }

    @Test
    void getNCardsTest(){
        int n = 30;
        for(int i=0; i<n; i++){
            boardRepository.save(Board.builder()
                    .writer("테스트" + (i + 1))
                    .content("테스트 컨텍스트" + (i + 1))
                    .created_at("2022.02.22")
                    .build());
        }
        int page = 2;
        List<Board> boardList = boardRepository.findN(page);
        assertEquals(20, boardList.size());
        for(int i=1; i<n; i++){
            assertNotEquals(boardList.get(i-1).getId(), boardList.get(i).getId());
        }
    }

    @Test
    void postCardTest(){
        String writer = "테스트";
        String content = "테스트 해봄";
        String image_url = "test.png";
        String created_at = "2000/01/01";

        Board board = Board.builder()
                .writer(writer).content(content).image_url(image_url)
                .created_at(created_at).build();

        if(board.getContent()==null){
            throw new BadRequestException("내용을 입력해 주세요.");
        }

        Board boardPS = boardRepository.save(board);

        assertEquals(writer, boardPS.getWriter());
        assertEquals(content, boardPS.getContent());
        assertEquals(image_url, boardPS.getImage_url());
        assertEquals(created_at, boardPS.getCreated_at());
    }

    @Test
    void updateCardTest(){
        String writer = "테스트";
        String content = "테스트 해봄";
        String image_url = "test.png";
        String created_at = "2000/01/01";

        Board board = Board.builder()
                .writer(writer).content(content).image_url(image_url)
                .created_at(created_at).build();

        if(board.getContent()==null){
            throw new BadRequestException("내용을 입력해 주세요.");
        }

        Board boardPS = boardRepository.save(board);

        content = "수정 테스트 해봄";
        image_url = "new_test.png";

        Board boardPS2 = boardRepository.findById(boardPS.getId())
                .orElseThrow(()-> new BadRequestException("해당하는 카드가 없습니다."));

        boardPS2.setContent(content);
        boardPS2.setImage_url(image_url);

        Board boardPS3 = boardRepository.save(boardPS2);

        assertEquals(writer, boardPS3.getWriter());
        assertEquals(content, boardPS3.getContent());
        assertEquals(image_url, boardPS3.getImage_url());
        assertEquals(created_at, boardPS3.getCreated_at());
    }

    @Test
    void deleteCardTest(){
        String writer = "테스트";
        String content = "테스트 해봄";
        String image_url = "test.png";
        String created_at = "2000/01/01";

        Board board = Board.builder()
                .writer(writer).content(content).image_url(image_url)
                .created_at(created_at).build();

        if(board.getContent()==null){
            throw new BadRequestException("내용을 입력해 주세요.");
        }

        Board boardPS = boardRepository.save(board);
        boardRepository.deleteById(boardPS.getId());

        assertNull(boardRepository.findById(boardPS.getId()));
    }

    @AfterEach
    void tearDown(){}

    @AfterAll
    static void tearDownAll(){}
}
