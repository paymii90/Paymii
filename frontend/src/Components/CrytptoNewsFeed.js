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
} from "react-native";
import axios from "axios";
import fallBackImage from "../../assets/thumbnail.jpeg";
import newsFeed from "../../assets/data/news";
import LottieView from "lottie-react-native";

const API_KEY = "pub_3b6fd31a84d0411aa4bf76be7f8c0766"; // Replace with your key

const CryptoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=crypto&language=en&category=business`
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
      setNews(newsFeed); // fallback data
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

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>News</Text>
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
          data={news.slice(0, 100)}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <Text style={styles.source}>
                    {item.kind || "News"} ·{" "}
                    {new Date(item.published_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Image source={getImageSource(item)} style={styles.thumbnail} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedItem && (
                <>
                  <Image
                    source={getImageSource(selectedItem)}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
                  <Text style={styles.modalSource}>
                    {selectedItem?.kind || "News"} ·{" "}
                    {new Date(selectedItem?.published_at).toLocaleString()}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedItem?.description || "No description available."}
                  </Text>

                  {selectedItem?.url && (
                    <Pressable
                      onPress={() => Linking.openURL(selectedItem.url)}
                      style={[styles.actionButton, { backgroundColor: "#555" }]}
                    >
                      <Text style={styles.buttonText}>Read More</Text>
                    </Pressable>
                  )}
                </>
              )}
            </ScrollView>

            <Pressable
              style={[styles.actionButton, { backgroundColor: "#0a84ff" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
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
