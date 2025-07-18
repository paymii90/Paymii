import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "../../../../Components/SafeAreaWrapper";
import AttachmentModal from "./AttachmentModal";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EmojiSelector from "react-native-emoji-selector";
import dummyMessages from "../../../../../assets/data/messages";

const ChatScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [input, setInput] = useState("");
  const insets = useSafeAreaInsets();
  const [lastSeenText, setLastSeenText] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [isAttachmentModalVisible, setAttachmentModalVisible] = useState(false);

  const [messages, setMessages] = useState(dummyMessages || []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  //For Last Seen Text
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes === 1) return "1 minute ago";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  //For Attachment Modal
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;

        const now = new Date();
        const newMessage = {
          id: `${Date.now()}`,
          sender: "You",
          type: "sent",
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: input.trim(), // allow combined text + image
          image: uri,
          date: now.toISOString().split("T")[0],
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput(""); // clear input after sending
      }

      setAttachmentModalVisible(false);
    } catch (error) {
      console.error("Image Picker Error:", error);
      alert("Something went wrong picking the image.");
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        // alert("Photo taken: " + result.assets[0].uri);
        const uri = result.assets[0].uri;

        const now = new Date();
        const newMessage = {
          id: `${Date.now()}`,
          sender: "You",
          type: "sent",
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          content: input.trim(), // allow combined text + image
          image: uri,
          date: now.toISOString().split("T")[0],
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput(""); // clear input after sending
      }
    }
    setAttachmentModalVisible(false);
  };

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      alert("File picked: " + result.name);
    }
    setAttachmentModalVisible(false);
  };

  useEffect(() => {
    scrollToEnd();
    // Update last seen text every minute
    const updateLastSeen = () => {
      const lastMsg = [...messages]
        .reverse()
        .find((msg) => msg.type === "received" || msg.type === "sent");
      if (lastMsg) {
        const [hoursStr, minutesStrWithMeridiem] = lastMsg.time.split(":");
        const [minutesStr, meridiem] = minutesStrWithMeridiem.split(" ");
        let hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        if (meridiem === "PM" && hours !== 12) hours += 12;
        if (meridiem === "AM" && hours === 12) hours = 0;

        const date = new Date(lastMsg.date); // this is yyyy-mm-dd
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        setLastSeenText(getTimeAgo(date));
      }
    };

    updateLastSeen(); // run immediately
    const interval = setInterval(updateLastSeen, 60000); // update every minute
    return () => clearInterval(interval); // cleanup
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const newMessage = {
      id: `${Date.now()}`, // unique string ID
      sender: "You",
      content: input,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: now.toISOString().split("T")[0],
      type: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    scrollToEnd();
  };

  const formatDateLabel = (dateStr) => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";

    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  let lastDate = null;

  return (
    <SafeAreaWrapper>
      <ImageBackground
        source={require("../../../../../assets/chat-bg.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={insets.top}
          >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              {/* Header */}
              <BlurView intensity={60} tint="light" style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>CryptoVerstors✨</Text>
                  <Text style={styles.lastSeen}>last seen {lastSeenText}</Text>
                </View>

                <Ionicons name="ellipsis-vertical" size={20} color="#333" />
              </BlurView>

              {/* Messages */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={{ paddingBottom: 20 }}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={scrollToEnd}
              >
                {messages.map((msg) => {
                  const showDateLabel = msg.date !== lastDate;
                  lastDate = msg.date;

                  return (
                    <View key={msg.id}>
                      {showDateLabel && (
                        <Text style={styles.dateLabel}>
                          {formatDateLabel(msg.date)}
                        </Text>
                      )}
                      <View
                        style={[
                          styles.messageRow,
                          msg.type === "sent"
                            ? styles.sentRow
                            : styles.receivedRow,
                        ]}
                      >
                        {msg.type === "received" && msg.avatar && (
                          <Image
                            source={msg.avatar}
                            style={styles.bubbleAvatar}
                          />
                        )}
                        <View
                          style={[
                            styles.bubble,
                            msg.type === "sent"
                              ? styles.sentBubble
                              : styles.receivedBubble,
                          ]}
                        >
                          {msg.type === "received" && (
                            <Text style={styles.senderName}>{msg.sender}</Text>
                          )}
                          {/* Show image if available */}
                          {msg.image && (
                            <TouchableOpacity
                              onPress={() => {
                                setSelectedImage(msg.image);
                                setImageModalVisible(true);
                              }}
                            >
                              <Image
                                source={{ uri: msg.image }}
                                style={{
                                  width: 200,
                                  height: 150,
                                  borderRadius: 8,
                                  marginTop: 5,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          {/* Show text if available */}
                          {msg.content ? (
                            <Text
                              style={[
                                styles.messageText,
                                msg.type === "sent" && { color: "#fff" },
                              ]}
                            >
                              {msg.content}
                            </Text>
                          ) : null}
                          <Text style={styles.timestamp}>{msg.time}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              {/* Input */}
              <BlurView
                intensity={60}
                tint="light"
                style={styles.inputContainer}
              >
                <TouchableOpacity
                  onPress={() => setAttachmentModalVisible(true)}
                >
                  <Ionicons name="attach" size={28} color="#777" />
                </TouchableOpacity>

                <TextInput
                  placeholder="Start typing..."
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  onFocus={scrollToEnd}
                />
                <TouchableOpacity onPress={handleSend}>
                  <Ionicons name="send" size={28} color="#052644" />
                </TouchableOpacity>
              </BlurView>
              <AttachmentModal
                visible={isAttachmentModalVisible}
                onClose={() => setAttachmentModalVisible(false)}
                onPickImage={handlePickImage}
                onPickFile={handlePickFile}
                onTakePhoto={handleTakePhoto}
              />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
      {/* // Image Modal */}
      {selectedImage && (
        <Modal
          visible={isImageModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setImageModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setImageModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullscreenImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  groupInfo: {
    alignItems: "center",
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastSeen: {
    fontSize: 12,
    color: "#666",
  },
  dateLabel: {
    alignSelf: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginVertical: 6,
    color: "#333",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "flex-end",
  },
  sentRow: {
    justifyContent: "flex-end",
  },
  receivedRow: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "75%",
    borderRadius: 8,
    padding: 10,
  },
  sentBubble: {
    backgroundColor: "#052644",
    marginLeft: 40,
    borderTopRightRadius: 0,
  },
  receivedBubble: {
    backgroundColor: "#ffc663",
    marginRight: 10,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: "#555",
    textAlign: "right",
    marginTop: 4,
  },
  bubbleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 8,
  },
  senderName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
});
