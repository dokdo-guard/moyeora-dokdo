package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Dogam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DogamRepository  extends JpaRepository <Dogam, Long> {

}
