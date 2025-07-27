import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity as RNTO,
} from "react-native";
import axios from "axios";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import fallBackImage from "../../assets/thumbnail.jpeg";
import newsFeed from "../../assets/data/news";

const API_KEY = "pub_3b6fd31a84d0411aa4bf76be7f8c0766";

const CryptoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=crypto&language=en&category=business,top,technology`
      );

      const transformedNews = response.data.results.map((item) => ({
        title: item.title,
        description: item.description,
        url: item.link,
        published_at: item.pubDate,
        thumbnail: item.image_url,
        kind: item.category?.[0] || "News",
      }));

      setNews(transformedNews);
    } catch (error) {
      console.warn("⚠️ Using fallback news due to API error");
      setNews(newsFeed); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getImageSource = (item) => {
    return item.thumbnail && item.thumbnail.startsWith("http")
      ? { uri: item.thumbnail }
      : fallBackImage;
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const getRelativeTime = (dateStr) => {
    const publishedTime = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - publishedTime) / 60000); // minutes

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min${diff === 1 ? "" : "s"} ago`;
    const hours = Math.floor(diff / 60);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>📰 Crypto News</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://newsdata.io")}
        >
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <LottieView
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <Text style={styles.source}>
                    {item.kind || "News"} · {getRelativeTime(item.published_at)}
                  </Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Image source={getImageSource(item)} style={styles.thumbnail} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Glassy Modal with tap-to-dismiss */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <RNTO
          activeOpacity={1}
          onPress={closeModal}
          style={styles.modalOverlay}
        >
          <BlurView
            intensity={20}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <RNTO activeOpacity={1} onPress={() => {}} style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedItem && (
                <>
                  <Image
                    source={getImageSource(selectedItem)}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  <Text style={styles.modalSource}>
                    {selectedItem.kind || "News"} ·{" "}
                    {getRelativeTime(selectedItem.published_at)}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedItem.description || "No description available."}
                  </Text>

                  {selectedItem.url && (
                    <Pressable
                      onPress={() => Linking.openURL(selectedItem.url)}
                      style={[styles.actionButton, { backgroundColor: "#444" }]}
                    >
                      <Text style={styles.buttonText}>
                        📎 Read Full Article
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
            </ScrollView>

            <Pressable
              style={[styles.actionButton, { backgroundColor: "#0a84ff" }]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </RNTO>
        </RNTO>
      </Modal>
    </View>
  );
};

export default CryptoNewsFeed;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  viewMore: {
    color: "#0a84ff",
    fontWeight: "600",
  },
  newsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  newsText: {
    flex: 1,
    paddingRight: 10,
  },
  source: {
    fontSize: 12,
    color: "#555",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 4,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "85%",
    width: "100%",
  },
  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#052644",
  },
  modalSource: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  actionButton: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
