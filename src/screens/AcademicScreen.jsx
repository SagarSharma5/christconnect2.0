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
      const LOCAL_IP = "192.168.102.126"; // Replace with your actual IP
      const baseUrl =
        activeTab === "Information"
          ? `http://${LOCAL_IP}:3000/classroom/courses/recentAnnouncements`
          : `http://${LOCAL_IP}:3000/classroom/courses/recentCourseworks`;

      const accessToken =
        "ya29.a0AXeO80Ry74UaCu21ed-0GGP17QvZMRbUvUz-fslrjdMIozdBTuggcg9kO0u-5quw4nYEejunYS9T9qDTQrjj2YlDK4zsLZkqhvh7fbicw4fzm-a6SITjmLOVOF_svQ3jxWYmM0ian54RmRZuuyQ7faoDkVB1V0Ddf9_QQGosaCgYKATQSARMSFQHGX2MiIKXxwO3a_jA3JbHDPd1tnA0175";

      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("Data fetched successfully:", response.data.coursework);
      const finalData = response.data.coursework ?? response.data.announcements;

      const formattedData = finalData.map((item) => {
        const originalCreationTime = new Date(item.creationTime);

        const formattedCreationTime = originalCreationTime.toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        );

        let finalString = "";
        if (item?.dueDate) {
          const dueDate = item?.dueDate;

          const dueTime = item?.dueTime;

          console.log(dueDate, dueTime);

          // Create a Date object in UTC
          const utcDate = new Date(
            Date.UTC(
              dueDate.year,
              dueDate.month - 1,
              dueDate.day,
              dueTime.hours,
              dueTime.minutes
            )
          );

          // Convert UTC to IST by adding 5 hours 30 minutes
          const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

          // Format the date
          const formattedDate = istDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

          // Extract IST hours and minutes manually
          let hours = istDate.getHours();
          let minutes = istDate.getMinutes();
          let ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12; // Convert to 12-hour format

          // Format time string
          const formattedTime = `${hours}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

          // Final output
          finalString = `${formattedDate}, ${formattedTime}`;
          // console.log(finalString);
        }

        return {
          id: item.id,
          courseName: item.courseName,
          publishedDate: formattedCreationTime,
          // dueDate: item?.dueDate,
          dueTime: finalString === "" ? "No Due Date" : finalString,
          text: item?.title ?? item?.text,
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
          <Text style={styles.cardSubtitle}>Due: {item.dueTime}</Text>
        )}
      </View>

      {/* Card Body */}
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{item.text}</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={styles.cardButtonText}>Set Reminder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header height="90" />

      <View>
        {/* Tab Switch */}
        <View style={[styles.tabContainer]}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Information" && styles.activeTab,
            ]}
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
      </View>
      {/* Bottom Navigation Bar */}
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
    alignSelf: "center",
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  cardBody: {
    marginBottom: 10,
    width: "100%",
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
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
