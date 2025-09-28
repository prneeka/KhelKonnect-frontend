const { admin } = require("./config/firebaseConfig");

async function cleanupOrphanedUsers() {
  try {
    const listUsers = await admin.auth().listUsers();
    const authUsers = listUsers.users;

    for (const user of authUsers) {
      console.log("UID:", user.uid);
      console.log("Email:", user.email);
      console.log("Phone:", user.phoneNumber);
      console.log("Display Name:", user.displayName);
      console.log("Provider:", user.providerData.map(p => p.providerId));
      console.log("Created At:", new Date(user.metadata.creationTime));
      console.log("Last Sign-in:", new Date(user.metadata.lastSignInTime));

      const userDoc = await admin.firestore().collection("users").doc(user.uid).get();
      const orgDoc = await admin.firestore().collection("organisations").doc(user.uid).get();

      if (!userDoc.exists && !orgDoc.exists) {
        console.log("Deleting orphaned user:", user.uid, user.email);
        await admin.auth().deleteUser(user.uid);
      }
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
}

cleanupOrphanedUsers();
