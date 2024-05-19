import { QueryDocumentSnapshot } from "firebase/firestore";

function recipientEmail(doc: QueryDocumentSnapshot, loggedInEmail: string) {
    return doc.data().users.filter((doc: any) => doc !== loggedInEmail)[0];
}

export { recipientEmail };
