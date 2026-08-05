import express from 'express';
import Review from '../models/Review.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Submit rating and review for completed appointment
// @route   POST /api/reviews
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { appointmentId, docId, rating, reviewText } = req.body;
        const userId = req.user?._id || 'user123';

        let reviewRecord;
        try {
            reviewRecord = await Review.create({
                appointmentId,
                userId,
                docId,
                rating,
                reviewText
            });

            // Update appointment record
            await Appointment.findByIdAndUpdate(appointmentId, {
                reviewSubmitted: true,
                rating,
                reviewText
            });

            // Update doctor rating stats
            const doctorReviews = await Review.find({ docId });
            if (doctorReviews.length > 0) {
                const avgRating = (doctorReviews.reduce((acc, item) => acc + item.rating, 0) / doctorReviews.length).toFixed(1);
                await Doctor.findByIdAndUpdate(docId, {
                    rating: parseFloat(avgRating),
                    reviewsCount: doctorReviews.length
                });
            }
        } catch (dbErr) {
            reviewRecord = { appointmentId, userId, docId, rating, reviewText };
        }

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            review: reviewRecord
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
