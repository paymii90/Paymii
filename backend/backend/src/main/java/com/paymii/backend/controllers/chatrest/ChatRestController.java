package com.paymii.backend.controllers.chatrest;

import com.paymii.backend.entities.ChatMessage;
import com.paymii.backend.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("*") // Allow all origins; adjust in prod
public class ChatRestController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }

    @GetMapping
    public List<ChatMessage> getMessages() {
        return chatMessageRepository.findAll();
    }
}
