const Reviews = require('../models/Reviews');

const createReview = async (req, res) => {
const { reviewText, rating } = req.body;
try {
    const review = await Reviews.create({
    reviewText,
    rating,
    });
    res.status(201).json(review);
} catch (error) {
    console.error('Error creating review: ', error);
    res.status(500).json({ error: 'Unable to create review' });
}
};

const getAllReviews = async (req, res) => {
try {
    const reviews = await Reviews.findAll();
    console.log(`Retrieved ${reviews.length} reviews.`);
    res.json(reviews);
} catch (error) {
    console.error('Error retrieving reviews: ', error);
    res.status(500).json({ error: 'Unable to retrieve reviews' });
}
};

const getReviewById = async (req, res) => {
const id = req.params.id;

try {
    const review = await Reviews.findByPk(id);
    if (review) {
    console.log(`Retrieved review with ID ${id}: `, review);
    res.json(review);
    } else {
    console.log(`Review with ID ${id} not found.`);
    res.status(404).json({ error: 'Review not found' });
    }
} catch (error) {
    console.error(`Error retrieving review with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to retrieve review' });
}
};

const updateReviewById = async (req, res) => {
const id = req.params.id;
const updates = req.body;

try {
    const review = await Reviews.findByPk(id);
    if (review) {
    await review.update(updates);
    console.log(`Review with ID ${id} has been updated.`);
    res.json(review);
    } else {
    console.log(`Review with ID ${id} not found.`);
    res.status(404).json({ error: 'Review not found' });
    }
} catch (error) {
    console.error(`Error updating review with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to update review' });
}
};

const deleteReviewById = async (req, res) => {
const id = req.params.id;

try {
    const review = await Reviews.findByPk(id);
    if (review) {
    await review.destroy();
    console.log(`Review with ID ${id} has been deleted.`);
    res.status(204).send();
    } else {
    console.log(`Review with ID ${id} not found.`);
    res.status(404).json({ error: 'Review not found' });
    }
} catch (error) {
    console.error(`Error deleting review with ID ${id}: `, error);
    res.status(500).json({ error: 'Unable to delete review' });
}
};

module.exports = {
createReview,
getAllReviews,
getReviewById,
updateReviewById,
deleteReviewById
};
