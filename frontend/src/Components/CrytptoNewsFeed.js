import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  Pressable,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import fallBackImage from "../../assets/thumbnail.jpeg";
import fallbackNews from "../../assets/data/news";

const API_KEY = "pub_3b6fd31a84d0411aa4bf76be7f8c0766";
const CATEGORIES = [
  "All",
  "Bitcoin",
  "Ethereum",
  "Altcoins",
  "Crypto",
  "NFTs",
  "DeFi",
];

const CryptoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchNews = async (category = "All") => {
    setLoading(true);
    try {
      const topic = category === "All" ? "crypto" : category.toLowerCase();
      const res = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${topic}&language=en&category=business,technology`
      );

      const transformed = res.data.results.map((item) => ({
        title: item.title,
        description: item.description,
        url: item.link,
        published_at: item.pubDate,
        thumbnail: item.image_url,
        kind: item.category?.[0] || "News",
      }));

      setNews(transformed);
    } catch (err) {
      console.warn("⚠️ Using fallback news due to API error");
      setNews(fallbackNews);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews(activeCategory);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const getImageSource = (item) => {
    return item.thumbnail?.startsWith("http")
      ? { uri: item.thumbnail }
      : fallBackImage;
  };

  const getTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff} sec${diff === 1 ? "" : "s"} ago`;
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} min${mins === 1 ? "" : "s"} ago`;
    }
    if (diff < 86400) {
      const hrs = Math.floor(diff / 3600);
      return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
    }
    return date.toDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>📰 Paymii News</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://newsdata.io")}
        >
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tabButton,
              activeCategory === cat && styles.activeTab,
            ]}
            onPress={() => {
              setActiveCategory(cat);
              fetchNews(cat);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeCategory === cat && styles.activeTabText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <LottieView
          source={require("../../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.newsItem}>
                <View style={styles.newsText}>
                  <Text style={styles.source}>
                    {item.kind} · {getTimeAgo(item.published_at)}
                  </Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Image source={getImageSource(item)} style={styles.thumbnail} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <BlurView
            intensity={25}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <Pressable style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedItem && (
                <>
                  <Image
                    source={getImageSource(selectedItem)}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  <Text style={styles.modalSource}>
                    {selectedItem.kind} ·{" "}
                    {new Date(selectedItem.published_at).toLocaleString()}
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
              <Pressable
                style={[styles.actionButton, { backgroundColor: "#0a84ff" }]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
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
  tabRow: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeTab: {
    backgroundColor: "#0a84ff",
  },
  tabText: {
    color: "#000",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
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
