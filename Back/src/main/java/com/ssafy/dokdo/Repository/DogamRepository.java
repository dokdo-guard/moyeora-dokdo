package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Dogam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface DogamRepository  extends JpaRepository <Dogam, Long> {


    List<Dogam> findAllByUser_Id(String user_id);


}
