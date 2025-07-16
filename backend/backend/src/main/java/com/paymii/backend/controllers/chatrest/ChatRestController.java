// ChatRestController.java
package com.paymii.backend.controllers.chatrest;

import com.paymii.backend.dtos.chat_message.ChatMessageDto;
import com.paymii.backend.entities.ChatMessage;
import com.paymii.backend.repositories.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatRestController {

    private final ChatMessageRepository chatMessageRepository;

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessageDto dto) {
        ChatMessage saved = chatMessageRepository.save(ChatMessage.builder()
                .sender(dto.getSender())
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .room(dto.getRoom())
                .build());

        return ResponseEntity.ok(saved);
    }
}
