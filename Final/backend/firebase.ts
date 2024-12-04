import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./service_account.json";
import { cert } from "firebase-admin/app";


const app = admin.initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

type Player = {
  id: string; 
  name: string;
  score: number;
};
export const getLeaderboard = async (): Promise<Player[]> => {
  const leaderboardRef = db.collection("leaderboard");
  const snapshot = await leaderboardRef.get();

  const data: Player[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Player, "id">),
  }));

  return data;
};

export const updatePlayerScore = async (playerId: string, newScore: number): Promise<void> => {
  const playerRef = db.collection("leaderboard").doc(playerId);
  await playerRef.update({ score: newScore });
};

export { db};
