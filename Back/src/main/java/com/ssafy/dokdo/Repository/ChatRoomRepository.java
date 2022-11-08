package com.ssafy.dokdo.Repository;

// import 생략....

import com.ssafy.dokdo.Model.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {

    private Map<String, ChatRoom> chatRoomInfoMap; // 채팅 방 정보 (roomid, chatroom)
    private Map<String, String> chatRoomEnterMap; // 유저 정보 (roomid, sessionid)
//    private Map<String, ChatRoom> chatRoomUserCountMap; // 채팅 방 유저 수

    @PostConstruct
    public void init(){
        chatRoomInfoMap = new LinkedHashMap<>();
        chatRoomEnterMap = new LinkedHashMap<>();
        createChatRoom("1번 서버");
        createChatRoom("2번 서버");
        createChatRoom("3번 서버");
        createChatRoom("4번 서버");
    }

    public List<ChatRoom> findAllRoom() {
        List<ChatRoom> chatRooms = new ArrayList<>(chatRoomInfoMap.values());
//        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoom findRoomById(String id) {
        return chatRoomInfoMap.get(id);
    }

    private ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        chatRoomInfoMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    // 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        chatRoomEnterMap.put(sessionId, roomId);
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public String getUserEnterRoomId(String sessionId) {
        return chatRoomEnterMap.get(sessionId);
    }

    // 유저 세션정보와 맵핑된 채팅방ID 삭제
    public void removeUserEnterInfo(String sessionId) {
        chatRoomEnterMap.remove(sessionId);
    }

    public void plusUserCount(String id){
        long count = this.findRoomById(id).getUserCount();
        this.findRoomById(id).setUserCount(count + 1);
    }

    public void minusUserCount(String id){
        long count = this.findRoomById(id).getUserCount();
        this.findRoomById(id).setUserCount((count>0? count-1: 0));
    }
}