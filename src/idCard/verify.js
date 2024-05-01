import express from 'express';
import axios from 'axios';

import { authMiddleware, adminMiddleware } from './middlewares';

const router = express.Router();

router.post('/verify', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { data, imageUrl } = req.body; 

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    
    textract.fromBufferWithMime('image/png', imageBuffer, (error, extractedText) => {
      if (error) {
        res.status(500).json({ error: 'An error occurred' });
      } else {
     
        const isMatch = compareDataWithText(data, extractedText); 

        if (isMatch) {
          res.json({ status: 'Verified' });
        } else {
          res.json({ status: 'Verification Pending' });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;
