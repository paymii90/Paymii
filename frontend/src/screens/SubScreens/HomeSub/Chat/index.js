// src/screens/ChatScreen.js

import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchMessages, sendMessage } from "../../../../api/messageApi";
import { IpContext } from "../../../../context/IpContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";


export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [myUserId, setMyUserId] = useState(null);
  const flatListRef = useRef(null);
  const { ipAddress } = useContext(IpContext);

  // Load logged in user details from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed?.id) {
          setMyUserId(parsed.id.toString());
        }
        if (parsed?.firstName) {
          setName(parsed.firstName);
          // console.log("User name loaded:", parsed.firstName);
        }
      } catch (err) {
        console.error("Failed to load user ID:", err);
      }
    };

    loadUser();
  }, []);

  // Load messages from the backend
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages(ipAddress);
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          return;
        }
        // Format each message to include the sender name
        const formatted = data.map((msg) => {
          const date = msg.timestamp?.split("T")[0] ?? "Unknown";
          const time = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          // If it's our own message, show "You", otherwise use the provided firstName
          const senderName =
            msg.userId === myUserId ? "You" : msg.firstName || msg.userId;

          return {
            id: msg.id.toString(),
            sender: senderName,
            type: msg.userId === myUserId ? "sent" : "received",
            content: msg.content,
            date,
            time,
          };
        });
        setMessages(formatted);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };

    // Only load messages if the IP and user ID have loaded
    if (ipAddress && myUserId) {
      loadMessages();
    }
  }, [input, ipAddress, myUserId]);

  // Send a new message
  const handleSend = async () => {
    if (!input.trim()) return;

    const messagePayload = {
      userId: myUserId,
      firstName: name, // Include firstName from AsyncStorage
      content: input.trim(),
    };

    try {
      const savedMsg = await sendMessage(messagePayload, ipAddress);
      const now = new Date(savedMsg.timestamp);
      const newMessage = {
        id: savedMsg.id.toString(),
        sender: "You",
        content: savedMsg.content,
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: now.toISOString().split("T")[0],
        type: "sent",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      scrollToEnd();
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.type === "sent" ? styles.sent : styles.received,
      ]}
    >
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    ><Image source={require('../../../../../assets/chat-bg.png')} style={{ position: 'absolute', width: '100%', height: '100%' }} />
    <BlurView style={styles.header}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Chat</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Welcome, {name || "User"}!</Text>
      </BlurView>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={scrollToEnd}
      />

      <BlurView  style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </BlurView>
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messagesContainer: { padding: 10 },
  message: {
    marginBottom: 12,
    maxWidth: "80%",
    padding: 10,
    borderRadius: 8,
  },
  header: {
   // flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  content: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 20,
    // backgroundColor: "red",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#052644",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
