const express = import('express');
const multer  = import('multer');
const tf = import('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = import('canvas');
const fs = import('fs');

const app = import('');
const port = 3000;

const upload = multer({ dest: 'uploads/' });

async function classifyImage(imagePath) {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const tensor = tf.browser.fromPixels(imageData).resizeNearestNeighbor([224, 224]).toFloat().expandDims();

    const model = await tf.loadLayersModel('path_to_your_model/model.json');
    const predictions = model.predict(tensor);
    return predictions;
}

app.post('/verify', upload.single('idCard'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        const predictions = await classifyImage(imagePath);

        const isIDCard = predictions.argMax(1).dataSync()[0] === predictions.shape[1] - 1;

        if (isIDCard) {
            res.send('ID Card Verified');
        } else {
            res.send('ID Card Not Verified');
        }

        fs.unlinkSync(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});