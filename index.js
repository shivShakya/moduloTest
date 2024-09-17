import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3000;
const filePath = 'visitorCount.txt';  // Path to the file where visitor count is stored

app.use(cors());

// Function to read the current visitor count from the file
const readVisitorCountFromFile = () => {
    try {
        if (!fs.existsSync(filePath)) {
            // If the file doesn't exist, initialize the count to 0
            fs.writeFileSync(filePath, '0', 'utf-8');
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return parseInt(data, 10);
    } catch (err) {
        console.error('Error reading the visitor count file:', err);
        return 0; // Default to 0 in case of an error
    }
};

// Function to write the updated visitor count to the file
const writeVisitorCountToFile = (count) => {
    try {
        fs.writeFileSync(filePath, count.toString(), 'utf-8');
    } catch (err) {
        console.error('Error writing to the visitor count file:', err);
    }
};

// Increment the visitor count and return it
const incrementCounter = () => {
    let visitorCount = readVisitorCountFromFile();
    visitorCount += 1;
    writeVisitorCountToFile(visitorCount);
    return visitorCount;
};

app.get('/', (req, res) => {
    try {
        const newCounterValue = incrementCounter();
        res.send({counter : newCounterValue});
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).send('Server error.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
