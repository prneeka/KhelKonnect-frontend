const { admin, db } = require("../config/firebaseConfig");
const axios = require('axios');

exports.applytournament=async (req, res) => {
    const { tournamentId, name, rating } = req.body;
  
    if (!req.session.user || req.session.user.role !== "player") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
  
    if (!tournamentId || !name || !rating) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    try {
      const tournamentRef = db.collection("tournaments").doc(tournamentId);
      const tournamentSnap = await tournamentRef.get();
  
      if (!tournamentSnap.exists) {
        return res.status(404).json({ success: false, message: "Tournament not found." });
      }
  
      const playerRef = tournamentRef.collection("players").doc(req.session.user.email);
      const playerSnap = await playerRef.get();
  
      if (playerSnap.exists) {
        return res.status(409).json({ success: false, message: "You have already applied to this tournament." });
      }
  
      await playerRef.set({
        id: req.session.user.email,
        name,
        rating: parseInt(rating),
        appliedBy: req.session.user.email,
        appliedAt: new Date(),
      });
  
      return res.json({ success: true, message: "Applied to tournament successfully!" });
    } catch (err) {
      console.error("Error applying:", err);
      return res.status(500).json({ success: false, message: "Error applying: " + err.message });
    }
}
  
exports.playerdash = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "user") {

    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
  
  try {
    
    const playerEmail = req.session.user.email;

    // 1. Find all applications for the current player
    const applicationsSnapshot = await db.collectionGroup('players')
      .where('id', '==', playerEmail)
      .get();

    if (applicationsSnapshot.empty) {
      return res.json({
        name: req.session.user.name,
        tournaments: [] // Return empty array if no registrations
      });
    }

    const tournamentIds = applicationsSnapshot.docs.map(doc => {
      const path = doc.ref.path;
      const pathParts = path.split('/'); 
      return pathParts[1]; 
    });

    const tournamentPromises = tournamentIds.map(tournamentId => 
      db.collection('tournaments').doc(tournamentId).get()
    );
    const tournamentSnapshots = await Promise.all(tournamentPromises);

    const tournaments = tournamentSnapshots.map(snap => ({
      id: snap.id,
      ...snap.data()
    }));

    return res.json({
      name: req.session.user.name,
      tournaments: tournaments
    });

  } catch (err) {
    console.error("Error fetching player dashboard:", err);
    res.status(500).send("Error fetching your events: " + err.message);
  }
}