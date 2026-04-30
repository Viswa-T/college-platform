const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ===================== DATA ===================== */
let colleges = [
  { id: 1, name: "IIT Madras", location: "Chennai", fees: 200000, rating: 4.8, placement: 95, courses: ["CSE", "ECE", "Mechanical"] },
  { id: 2, name: "IIT Bombay", location: "Mumbai", fees: 220000, rating: 4.9, placement: 97, courses: ["CSE", "Electrical"] },
  { id: 3, name: "IIT Delhi", location: "Delhi", fees: 210000, rating: 4.7, placement: 96, courses: ["CSE", "Mechanical"] },
  { id: 4, name: "IIT Kanpur", location: "Kanpur", fees: 200000, rating: 4.6, placement: 94, courses: ["CSE", "Civil"] },
  { id: 5, name: "IIT Kharagpur", location: "Kharagpur", fees: 190000, rating: 4.6, placement: 93, courses: ["CSE", "Mining"] },
  { id: 6, name: "NIT Trichy", location: "Trichy", fees: 150000, rating: 4.5, placement: 90, courses: ["CSE", "EEE"] },
  { id: 7, name: "NIT Surathkal", location: "Mangalore", fees: 140000, rating: 4.4, placement: 88, courses: ["CSE", "Mechanical"] },
  { id: 8, name: "NIT Warangal", location: "Warangal", fees: 145000, rating: 4.3, placement: 87, courses: ["CSE", "Civil"] },
  { id: 9, name: "BITS Pilani", location: "Pilani", fees: 300000, rating: 4.6, placement: 92, courses: ["CSE", "Electrical"] },
  { id: 10, name: "VIT Vellore", location: "Vellore", fees: 180000, rating: 4.3, placement: 85, courses: ["IT", "Mechanical"] },
  { id: 11, name: "SRM University", location: "Chennai", fees: 170000, rating: 4.1, placement: 80, courses: ["CSE", "ECE"] },
  { id: 12, name: "Anna University", location: "Chennai", fees: 80000, rating: 4.2, placement: 75, courses: ["IT", "Mechanical"] },
  { id: 13, name: "Delhi University", location: "Delhi", fees: 60000, rating: 4.0, placement: 70, courses: ["BA", "BSc"] },
  { id: 14, name: "Jadavpur University", location: "Kolkata", fees: 50000, rating: 4.3, placement: 82, courses: ["CSE", "Civil"] },
  { id: 15, name: "Osmania University", location: "Hyderabad", fees: 70000, rating: 4.0, placement: 72, courses: ["IT", "EEE"] }
];

let saved = [];
let users = [];
let questions = [];

/* ===================== Q&A ===================== */
app.post("/ask", (req, res) => {
  questions.push({
    id: Date.now(),
    text: req.body.text,
    answers: [],
  });
  res.json({ message: "Question added" });
});

app.post("/answer", (req, res) => {
  const { id, answer } = req.body;

  const q = questions.find(q => q.id == id);

  if (q) {
    q.answers.push(answer);
    return res.json({ message: "Answer added" });
  }

  res.status(404).json({ message: "Question not found" });
});

app.get("/questions", (req, res) => {
  res.json(questions);
});

/* ===================== COLLEGES ===================== */
app.get("/colleges", (req, res) => {
  const { search, location, maxFees } = req.query;

  let result = colleges;

  if (search) {
    result = result.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (location) {
    result = result.filter(c => c.location === location);
  }

  if (maxFees) {
    result = result.filter(c => c.fees <= Number(maxFees));
  }

  res.json(result);
});

app.get("/colleges/:id", (req, res) => {
  const college = colleges.find(c => c.id == req.params.id);
  res.json(college);
});

/* ===================== AUTH ===================== */
app.post("/signup", (req, res) => {
  users.push(req.body);
  res.json({ message: "User created" });
});

app.post("/login", (req, res) => {
  const user = users.find(
    u => u.email === req.body.email && u.password === req.body.password
  );

  res.json({ success: !!user });
});

/* ===================== SAVE ===================== */
app.post("/save", (req, res) => {
  saved.push(req.body);
  res.json({ message: "Saved" });
});

app.get("/saved", (req, res) => {
  res.json(saved);
});

/* ===================== PREDICTOR ===================== */
app.get("/predict", (req, res) => {
  const rank = Number(req.query.rank);
  const exam = req.query.exam;

  if (!rank || !exam) return res.json([]);

  let result = [];

  if (exam === "JEE") {
    if (rank <= 500) {
      result = colleges.filter(c => c.name.includes("IIT")).slice(0, 3);
    } else if (rank <= 2000) {
      result = colleges.filter(c =>
        c.name.includes("IIT") || c.name.includes("NIT")
      ).slice(0, 5);
    } else if (rank <= 5000) {
      result = colleges.filter(c =>
        c.name.includes("NIT")
      ).slice(0, 5);
    } else if (rank <= 10000) {
      result = colleges.filter(c =>
        !c.name.includes("IIT") &&
        (c.name.includes("NIT") || c.name.includes("VIT") || c.name.includes("SRM") || c.name.includes("BITS"))
      ).slice(0, 6);
    } else {
      result = colleges.filter(c =>
        !c.name.includes("IIT") && !c.name.includes("NIT")
      ).slice(0, 6);
    }
  }

  result = result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
