import { QrReader } from "react-qr-reader";

export default function AdminFoodTickets() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Verify Food Tickets
      <QrReader
        // ViewFinder={(
        //    <div className={styles.ViewFinder}>
        //       Hi
        //    </div>
        // )}
        scanDelay={50}
        onResult={(result, _) => {
          console.log(result);
        }}
        constraints={{ facingMode: "environment" }}
      />
    </main>
  );
}
