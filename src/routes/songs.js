const express = require('express');
const path = require('path');

const router = express.Router();

// Serve the metadata upload form
router.get('/upload/metadata', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/uploadMetadata.html'));
});

// Handle metadata submission
router.post('/upload/metadata', async (req, res) => {
    const { title, artist, album } = req.body;
    const db = req.db;

    try {
        const songRef = await db.collection('songs').add({
            title,
            artist,
            album,
            createdAt: new Date(),
        });

        res.redirect(`/songs/upload/lyrics/${songRef.id}`);
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error uploading metadata');
    }
});

// Serve the lyrics upload form
router.get('/upload/lyrics/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/uploadLyrics.html'));
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
