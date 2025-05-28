import admin, { ServiceAccount } from "firebase-admin";
import serviceAccountKey from "/etc/secrets/serviceAccountKey.json";
//* for production (in render), use above one.
// import serviceAccountKey from "../serviceAccountKey.json";

export const firebaseInit = () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
	});
};
