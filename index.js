const admin = require("firebase-admin");
const fs = require("fs");
const serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const company = "651bb573-e0b9-e2f9-0c1d-1893a30cf740";
const form = "-appeal-form";
const formsPath = "./retrievedForms";

function getFormDocs() {
  const collRef = db.collection(`/companies/${company}/forms/`);
  collRef.get().then((ss) => {
    ss.docs.forEach((doc) => {
      getDocData(doc.id);
    });
  });
}

function getDocData(doc) {
  const doclRef = db.collection(`/companies/${company}/forms/`).doc(doc);
  doclRef.get().then((ss) => {
    const data = ss.data();
    fs.writeFile(
      `${formsPath}/${doc}`,
      JSON.stringify(ss.data().form),
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log(`${doc} saved!`);
      }
    );
  });
}
getFormDocs();
