package com.ssafy.dokdo.Model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlayerMessage {
    public enum MessageType{
        ENTER, MOVE, EXIT
    }

    @Builder
    public PlayerMessage(float x, float y, float z, String character, String sender, MessageType type, String roomId) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.character = character;
        this.sender = sender;
        this.type = type;
        this.roomId = roomId;
    }

    private float x;
    private float y;
    private float z;
    private String character;   // 캐릭터 정보
    private String sender;      // nickname
    private MessageType type;
    private String roomId;

//    public void setCoordi(float x, float y, float z){
//        this.x = x;
//        this.y = y;
//        this.z = z;
//    }
}
