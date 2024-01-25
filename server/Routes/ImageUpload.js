if (process.NODE_ENV !== 'prodution') {
    require('dotenv').config();
}
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { isLoggedIn, isAuthorized } = require('../Middleware/Auth');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

router.route('/:user_id/:slide_id/upload-image')
    .post(isLoggedIn, isAuthorized, upload.single('image'), async (req, res) => {
        const { slide_id } = req.params;
        console.log(slide_id);
        try {
            const result = await cloudinary.uploader.upload_stream({
                public_id: `live-quiz/${slide_id}`,
                resource_type: 'auto',
            }, (error, result) => {
                if (error) {
                    return res.status(500).send({ message: 'An error occurred while uploading the image' });
                }
                res.send({ imageUrl: result.secure_url });
            }).end(req.file.buffer);
        } catch (error) {
            res.status(500).send({ message: 'An error occurred while uploading the image' });
        }
    });

router.route('/:user_id/:slide_id/delete-image')
    .delete(isLoggedIn, isAuthorized, async (req, res) => {
        const { slide_id } = req.params;
        try {
            const result = await cloudinary.uploader.destroy(`live-quiz/${slide_id}`);
            res.send({ message: 'Image deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: 'An error occurred while deleting the image' });
        }
    });

module.exports = router;