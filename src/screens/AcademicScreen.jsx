import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

const AcademicScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Information");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl =
        activeTab === "Information"
          ? "http://localhost:3000/classroom/courses/recentAnnouncements"
          : "http://localhost:3000/classroom/courses/recentCourseworks";

      const accessToken =
        "ya29.a0AXeO80QBE5TRHy0BmBJ4O9BChch07sPg3vLS2VTzvFkJkNp7-2OekSRd9eRSqxx6e6U9z9TVCaBQ3sq5qJpjssy0Xj2kTrHwq-DV8lkVHvWgNf1kJxxSxDskXvl8VoT31ZUa_WkAMqW4zvYCArehRrGke02fFpV7plBDQI_SAqm3bCyktN576fk6u4IaCgYKAaYSARESFQHGX2MiiUQRXO85yqHoN1HyiifvWQ0194";

      // Send accessToken as x-www-form-urlencoded in headers
      const response = await axios.get(baseUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const now = new Date();
      const formattedData = response.data.slice(0, 10).map((item, index) => {
        const publishedDate = new Date(now.getTime() - index * 86400000); // Simulate past dates
        const dueDate = new Date(now.getTime() + (index + 1) * 86400000); // Simulate future dates
        return {
          id: item.id.toString(),
          courseName: item.courseName || `Course ${index + 1}`,
          publishedDate: publishedDate.toDateString(),
          dueDate: dueDate,
          text: item.description || item.body || "No description available.",
        };
      });

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const calculateCountdown = (dueDate) => {
    const now = new Date();
    const timeDiff = dueDate - now;
    if (timeDiff <= 0) return "Time's up!";
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.courseName}</Text>
        {activeTab === "Information" ? (
          <Text style={styles.cardSubtitle}>
            Published: {item.publishedDate}
          </Text>
        ) : (
          <Text style={styles.cardSubtitle}>
            Due: {calculateCountdown(item.dueDate)}
          </Text>
        )}
      </View>

      {/* Card Body */}
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{item.text}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.cardButtonText}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header height="90" />

      {/* Tab Switch */}
      <View style={[styles.tabContainer]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Information" && styles.activeTab]}
          onPress={() => setActiveTab("Information")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Information" && styles.activeTabText,
            ]}
          >
            Information
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Deadlines" && styles.activeTab]}
          onPress={() => setActiveTab("Deadlines")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Deadlines" && styles.activeTabText,
            ]}
          >
            Deadlines
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#003366" />
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 80,
            paddingHorizontal: 10,
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  tabContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
    marginTop: 100,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#003366",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  cardBody: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
  },
  cardButton: {
    alignSelf: "flex-end",
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AcademicScreen;
