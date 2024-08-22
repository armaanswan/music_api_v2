const express = require('express');
const path = require('path');

const router = express.Router();

// Serve the metadata upload form
router.get('/upload/metadata', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/uploadMetadata.html'));
});

// Handle metadata submission
router.post('/upload/metadata', async (req, res) => {
    const data = req.body;
    const db = req.db;

    try {
        const docRef = await db.collection('songs').add(data);
        res.json({ redirectUrl: `/songs/upload/lyrics/${docRef.id}` });
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error uploading metadata!');
    }
});

// Serve the lyrics upload form
router.get('/upload/lyrics/:id', async (req, res) => {
    const songId = req.params.id;
    const db = req.db;

    try {
        const docRef = db.collection('songs').doc(songId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).send('Song not found!');
        }

        const songData = doc.data();
        res.render('uploadLyrics', { songData: JSON.stringify(songData) });
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle lyrics submission
router.post('/upload/lyrics/:id', async (req, res) => {
    const { lyrics } = req.body;
    const songId = req.params.id;
    const db = req.db;

    try {
        await db.collection('songs').doc(songId).update({ lyrics });
        res.send('Lyrics uploaded successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
        res.status(500).send('Error uploading lyrics');
    }
});

module.exports = router;
