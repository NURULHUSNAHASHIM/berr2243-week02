const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const drivers = [
    {
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.5
    }
];

// show the data in the console
console.log("Initial Drivers:");
console.log(drivers);

// Task 2: show all the drivers' names
console.log("\nDriver Names:");
drivers.forEach(driver => console.log(driver.name));

// Task 2: add additional driver to the array
drivers.push({
    name: "James Bond",
    vehicleType: "BMW",
    isAvailable: true,
    rating: 4.9
});

console.log("\nUpdated Drivers:");
console.log(drivers);

async function main() {
    try {
        await client.connect();
        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");

        // Task 3: Insert drivers (use for...of to handle async properly)
        for (const driver of drivers) {
            const result = await driversCollection.insertOne(driver);
            console.log(`New driver created with _id: ${result.insertedId});
        }`);
            }
          // Task 4: Query available drivers (isAvailable: true, rating >= 4.5)
      const availableDrivers = await db.collection('drivers').find({ 
        isAvailable: true,
        rating: { $gte: 4.5 }
      }).toArray();
      console.log("Available drivers:", availableDrivers);

        // Task 5: Update rating for John Doe (+0.1)
        const updateResult = await driversCollection.updateOne(
            { name: "John Doe" },
            { $inc: { rating: 0.1 } }
        );
        console.log(`Driver updated with result: ${JSON.stringify(updateResult)}`);

        // Task 6: Delete unavailable drivers
        const deleteResult = await driversCollection.deleteOne({ isAvailable: false });
        console.log(`Driver deleted with result: ${JSON.stringify(deleteResult)}`);   

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
