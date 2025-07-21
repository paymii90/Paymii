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
import fallBackImage from "../../assets/thumbnail.jpeg"; // Fallback image if no thumbnail is available
import fallBackImage2 from "../../assets/thumbnail2.jpeg"; // Another fallback image if needed
import Button from "../Components/Button"; //
import newsFeed from "../../assets/data/news";

// const API_KEY = "60fb70a715600fc51f26f8b2cd32aa6a71c76e3a";

const CryptoNewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchNews = async () => {
    try {
      // const response = await axios.get(
      //   `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true`
      // );
      // setNews(response.data.results);
      // console.log("Fetched news:", response.data.results);
      // console.log(newsFeed);

      setNews(newsFeed);
    } catch (error) {
      console.error("Error fetching crypto news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getImageSource = (item) => {
    if (item.thumbnail && item.thumbnail.startsWith("http")) {
      return { uri: item.thumbnail };
    } else if (item.title.includes("Bitcoin")) {
      return {
        uri: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      };
    } else if (item.title.includes("Ethereum")) {
      return {
        uri: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      };
    } else if (item.title.includes("Solana")) {
      return {
        uri: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      };
    } else if (item.title.includes("BNB")) {
      return {
        uri: "https://assets.coingecko.com/coins/images/825/large/bnb.png",
      };
    } else if (item.title.includes("Cardano")) {
      return {
        uri: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      };
    } else {
      return fallBackImage;
    }
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
          onPress={() => Linking.openURL("https://cryptopanic.com")}
        >
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <FlatList
            data={news.slice(0, 100)}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const hasUrl = !!item.url;
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (hasUrl) {
                      Linking.openURL(item.url);
                    } else {
                      openModal(item);
                    }
                  }}
                >
                  <View style={styles.newsItem}>
                    <View style={styles.newsText}>
                      <Text style={styles.source}>
                        {item.kind || "Unknown"} ·{" "}
                        {new Date(item.published_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Image
                      source={getImageSource(item)}
                      style={styles.thumbnail}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          {/* <Button
            label="See More"
            backgroundColor="#052644"
            color="white"
            style={styles.button}
            labelStyle={{ fontWeight: 600 }}
            // action={}
          /> */}
        </>
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
                    {selectedItem?.kind || "Unknown"} ·{" "}
                    {new Date(selectedItem?.published_at).toLocaleString()}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedItem?.description || "No description available."}
                  </Text>

                  {selectedItem?.url && (
                    <Pressable
                      onPress={() => Linking.openURL(selectedItem.url)}
                      style={[styles.closeButton, { backgroundColor: "#555" }]}
                    >
                      <Text style={styles.closeButtonText}>
                        Read Full Article
                      </Text>
                    </Pressable>
                  )}
                </>
              )}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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

  // Modal styles
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
  closeButton: {
    marginTop: 15,
    backgroundColor: "#0a84ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
