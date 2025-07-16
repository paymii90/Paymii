import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const messages = [
  {
    id: '1',
    sender: 'You',
    content: 'Hey team!!',
    time: '11:30 AM',
    type: 'sent',
  },
  {
    id: '2',
    sender: 'You',
    content: 'Anyone on for lunch today',
    time: '11:31 AM',
    type: 'sent',
  },
  {
    id: '3',
    sender: 'Asher',
    content: "I'm down! Any ideas??",
    time: '11:35 AM',
    type: 'received',
    avatar: require('../../../../../assets/avatars/avatar.png'),
  },
  {
    id: '4',
    sender: 'You',
    content: 'I am down for whatever!',
    time: '11:36 AM',
    type: 'sent',
  },
  {
    id: '5',
    sender: 'Lordson',
    content: 'I was thinking the cafe downtown',
    time: '11:45 AM',
    type: 'received',
    avatar: require('../../../../../assets/avatars/avatar.png'),
  },
  {
    id: '6',
    sender: 'Lordson',
    content: 'But limited vegan options @Nana!',
    time: '11:46 AM',
    type: 'received',
    avatar: require('../../../../../assets/avatars/avatar.png'),
  },
  {
    id: '7',
    sender: 'You',
    content: 'Agreed',
    time: '11:52 PM',
    type: 'sent',
  },
  {
    id: '8',
    sender: 'Nana',
    content: "That works- I was actually planning to get a smoothie anyways 🙃",
    time: '12:03 PM',
    type: 'received',
    avatar: require('../../../../../assets/avatars/avatar.png'),
  },
  {
    id: '9',
    sender: 'Ella',
    content: 'On for 12:30 PM then ?',
    time: '12:04 PM',
    type: 'received',
    avatar: require('../../../../../assets/avatars/avatar.png'),
  },
];

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarCluster}>
          {['asher', 'lordson', 'nana', 'ella'].map((name, index) => (
            <Image
              key={index}
              source={require('../../../../../assets/avatars/avatar.png')}
              style={[styles.avatar, { left: index * 20, zIndex: 10 - index }]}
            />
          ))}
        </View>
        <View>
          <Text style={styles.groupName}>✨CryptoVerstors</Text>
          <Text style={styles.lastSeen}>last seen 45 minutes ago</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color="#333" />
      </View>

      <Text style={styles.dateLabel}>8/20/2020</Text>

      {/* Chat messages */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.type === 'sent' ? styles.sentRow : styles.receivedRow,
            ]}
          >
            {msg.type === 'received' && msg.avatar && (
              <Image source={msg.avatar} style={styles.bubbleAvatar} />
            )}
            <View
              style={[
                styles.bubble,
                msg.type === 'sent' ? styles.sentBubble : styles.receivedBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
              <Text style={styles.timestamp}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="happy-outline" size={24} color="#777" />
        <TextInput placeholder="Start typing..." style={styles.input} />
        <TouchableOpacity>
          <Ionicons name="send" size={24} color="#052644" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  avatarCluster: {
    flexDirection: 'row',
    marginRight: 12,
    position: 'relative',
    width: 80,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastSeen: {
    fontSize: 12,
    color: '#666',
  },
  dateLabel: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  sentRow: {
    justifyContent: 'flex-end',
  },
  receivedRow: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 8,
    padding: 10,
  },
  sentBubble: {
    backgroundColor: '#052644',
    marginLeft: 40,
    borderTopRightRadius: 0,
  },
  receivedBubble: {
    backgroundColor: '#ffc663',
    marginRight: 10,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
    marginTop: 4,
  },
  bubbleAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
});
