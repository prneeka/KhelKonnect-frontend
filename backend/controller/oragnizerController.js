const { admin, db } = require("../config/firebaseConfig");
const axios = require('axios');

exports.createtournament = async (req, res) => {
    const { name, rounds, date, location } = req.body;
    if (!req.session?.user?.email) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    if (!name || !rounds || !date || !location) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    try {
      const roundsNumber = Number(rounds);
      if (isNaN(roundsNumber) || roundsNumber <= 0) {
        return res.status(400).json({ success: false, message: "Rounds must be a positive number." });
      }

      const tournamentDate = new Date(date);
      if (isNaN(tournamentDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid date format." });
      }

      const tournamentData = {
        name: name.trim(),
        rounds: roundsNumber,
        date: tournamentDate,
        location: location.trim(),
        createdBy: req.session.user.email,
        createdById: req.session.user.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'upcoming',
        participants: 0,
        fixtures: []
      };

      const tournamentRef = await db.collection("tournaments").add(tournamentData);
      const tournamentId = tournamentRef.id;

      await tournamentRef.update({ id: tournamentId });
  
      return res.json({ 
        success: true,
        message: "Tournament created successfully!"
      });
    } catch (err) {
      console.error("Tournament creation error:", err.message);
      return res.status(500).json({ success: false, message: "Error creating tournament: " + err.message });
    }
};
  

exports.organdash=async (req, res) => {
    if (!req.session.user || req.session.user.role !== "organizer") {
      console.log("req.session.user");
    }
  
    try {
      
      const snapshot = await db.collection("tournaments")
        .where("createdBy", "==", req.session.user.email)
        .get();
  
      const tournaments = await Promise.all(snapshot.docs.map(async doc => {
        const tournament = doc.data();
        const tournamentId = doc.id;
  
        const playerSnap = await db.collection("tournaments")
          .doc(tournamentId)
          .collection("players")
          .get();
  
        const players = playerSnap.docs.map(p => ({
          id: p.id,
          ...p.data()
        }));
  
        return {
          ...tournament,
          id: tournamentId,
          players
        };
      }));
      res.json({
        user: req.session.user,
        tournaments
      });
  
  
    } catch (err) {
      console.error("Error fetching organizer dashboard:", err.message);
      res.send("Error fetching tournaments: " + err.message);
    }
}

