const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/azzbot', (req, res) => {
  const { teksnya } = req.query;
  const url = `https://rest-api.ikyystore3.repl.co/api/azzbot?teksnya=${encodeURIComponent(teksnya)}&sender=public&pushname=pengguna%20azzbot`;

  let retryCount = 0;

  const makeRequest = () => {
    axios
      .get(url)
      .then((response) => {
        const hasil = response.data; // Menyimpan hasil dari response

        if (hasil === "Maaf, aku belum mengerti dengan pertanyaanmu. Bisa kamu menjelaskannya lagi?") {
          if (retryCount < 3) {
            retryCount++;
            res.send('*!!!* \nPermintaan ke server sedang tinggi akibat tingginya permintaan. Meskipun ini memakan waktu, pesan Anda sedang diproses. Terima kasih atas kesabaran Anda.');
            makeRequest();
          } else {
            res.send('Server Down😞🙏');
          }
        } else {
          res.send(hasil);
        }
      })
      .catch((error) => {
        res.send(error);
      });
  };

  makeRequest();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

