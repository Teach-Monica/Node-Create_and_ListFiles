const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/create-file', (req, res) => {
  const now = new Date();
  const timestamp = now.getTime();
  const dateStr = now.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(/:/g, '');
  const filename = `${dateStr}_${timestamp}.txt`;
  const filepath = path.join(__dirname, filename);

  const content = `Timestamp: ${timestamp}`;

  fs.writeFile(filepath, content, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating file');
    }

    res.send(`File ${filename} created`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


app.get('/list-files', (req, res) => {
    const folderPath = path.join(__dirname);
  
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error listing files');
      }
  
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.send(textFiles);
    });
  });