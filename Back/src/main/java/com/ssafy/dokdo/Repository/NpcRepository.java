package com.ssafy.dokdo.Repository;

import com.ssafy.dokdo.Entity.Npc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NpcRepository extends JpaRepository<Npc, String> {
}
