const { admin, db } = require("../config/firebaseConfig");

exports.getalltournaments = async (req, res) => {

  if (!req.session.user || req.session.user.role !== "user") {
    return res.redirect("/login");
  }

  try {
    const {
      tournament_name = '',
      location = '',
      status = '',
      page = 1,
      limit = 10
    } = req.query;

    let query = db.collection("tournaments");
    // Apply filters if provided
    if (tournament_name) {
      const searchName = tournament_name.toLowerCase();
      query = query.where('name', '==', searchName);
    }

    if (location) {
      query = query.where('location', '==', location);
    }

    if (status) {
      query = query.where('status', '==', status);
    }

    query = query.orderBy('createdAt', 'desc');

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const snapshot = await query.get();
    
    const total = snapshot.size;
    const totalPages = Math.ceil(total / limitNum);

    const tournaments = snapshot.docs
      .slice(offset, offset + limitNum)
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    return res.json({
      success: true,
      tournaments,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      },
      filters: {
        tournament_name,
        location,
        status
      }
    });

  } catch (err) {
    console.error("Error fetching tournaments:", err.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching tournaments",
      error: err.message
    });
  }
};