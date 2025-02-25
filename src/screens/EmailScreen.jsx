import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";
import axios from "node_modules/axios";

const dummyEmails = [
  {
    id: "1",
    type: "Department",
    subject: "Meeting Update",
    sender: "HOD CS",
    time: "Feb 18, 2025 - 10:30 AM",
    content:
      "Meeting postponed to 3 PM. Please be prepared. Kindly go through the agenda before joining.",
    important: false,
  },
  {
    id: "2",
    type: "External",
    subject: "Job Opportunity",
    sender: "TechCorp HR",
    time: "Feb 18, 2025 - 9:00 AM",
    content:
      "We are hiring! Check out the roles available in our company. Positions open in frontend, backend, and data science departments.",
    important: false,
  },
  {
    id: "3",
    type: "Classroom",
    subject: "Assignment Submission",
    sender: "Prof. Sharma",
    time: "Feb 18, 2025 - 8:15 AM",
    content:
      "Submit your assignment by tonight. Late submissions will not be entertained. Ensure you follow the submission guidelines.",
    important: false,
  },
  {
    id: "4",
    type: "Department",
    subject: "Workshop on AI",
    sender: "AI Lab Coordinator",
    time: "Feb 17, 2025 - 5:00 PM",
    content:
      "An AI workshop is being conducted on Friday. Topics include deep learning, NLP, and computer vision. Attendance is mandatory for CS students.",
    important: false,
  },
  {
    id: "5",
    type: "External",
    subject: "Internship Applications Open",
    sender: "StartUp XYZ",
    time: "Feb 17, 2025 - 12:45 PM",
    content:
      "Looking for interns in software development and UI/UX. Apply before March 5th. Perks include mentorship and stipend.",
    important: false,
  },
];

const EmailScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [emails, setEmails] = useState(dummyEmails);
  const [finalEmails, setFinalEmails] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const filters = ["All", "Department", "External", "Classroom", "Important"];

  // const filteredEmails = finalEmails.filter((email) => {
  //   const matchesFilter =
  //     selectedFilter === "All" ||
  //     (selectedFilter === "Important"
  //       ? email.important
  //       : email.type === selectedFilter);
  //   const matchesSearch =
  //     email.headers.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.headers.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.body.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesFilter && matchesSearch;
  // });

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markAsImportant = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, important: !email.important } : email
      )
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl =
        selectedFilter === "All"
          ? `https://christconnect-backend.onrender.com/gmail/mails`
          : selectedFilter === "Department" 
          ? `https://christconnect-backend.onrender.com/gmail/department`
          : selectedFilter === "External"
          ? `https://christconnect-backend.onrender.com/gmail/others`
          : selectedFilter === "Classroom"
          ? `https://christconnect-backend.onrender.com/gmail/academic`
          : ``; // firebase important mails api

      const accessToken = ""; // Google Access Token
      
      const response = await axios.get(baseUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (Array.isArray(response.data?.emails)) {
        setFinalEmails(response.data.emails);
      } else {
        console.error('Unexpected data format:', response.data);
        setFinalEmails([]);
      }
      setPaginationData(response.data?.pagination);
      
      // console.log(finalEmails);
    } catch (error) {
      console.error('Error Fetching Data: ', error);
    } finally {
      setLoading(false);
    }
  }

  const formatReadableDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options).replace(',', ' -');
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#003366" style={{ flex: 1 }} />
          ) : (
            <View style={styles.fixedContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search emails..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterContainer}
                contentContainerStyle={{ alignItems: "center" }}
              >
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterButton,
                      selectedFilter === filter && styles.activeFilter,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selectedFilter === filter && styles.activeFilterText,
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <FlatList
                data={finalEmails}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => toggleAccordion(item.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.emailCard}>
                      <View style={styles.emailHeader}>
                        <Text style={styles.emailSubject}>{item.headers.subject}</Text>
                        <Text style={styles.emailTime}>{formatReadableDate(item.headers.date)}</Text>
                      </View>
                      <Text
                        style={styles.emailContent}
                        numberOfLines={expandedId === item.id ? 0 : 1}
                      >
                        {item.body}
                      </Text>
                      <Text style={styles.emailSender}>by {item.headers.from}</Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => navigation.navigate("Calendar")}
                        >
                          <Text style={styles.buttonText}>Set Reminder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => markAsImportant(item.id)}
                        >
                          <Text style={styles.buttonText}>
                            {item.important ? "Unmark" : "Mark as Important"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled" // Prevents keyboard from blocking interaction
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    marginTop: 100,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 40,
    minHeight: 40,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#ddd",
    height: 35, // Ensure uniform height
    justifyContent: "center", // Centers text
  },

  activeFilter: {
    backgroundColor: "#003366",
    height: 35, // Match height with filterButton
  },

  filterText: {
    fontSize: 14,
    color: "#003366",
    textAlignVertical: "center", // Ensures text remains aligned
  },

  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
    textAlignVertical: "center",
  },

  emailCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  emailSubject: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  emailTime: {
    fontSize: 12,
    color: "#888",
  },
  emailContent: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  emailSender: {
    fontSize: 12,
    color: "#777",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#003366",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default EmailScreen;
