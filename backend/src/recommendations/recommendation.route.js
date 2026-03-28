const express = require('express');
const router = express.Router();
const Order = require('../orders/order.model');
const Book = require('../books/book.model');

router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // 1. Get all orders by this user
    const orders = await Order.find({ email });
    const boughtIds = orders.flatMap(o =>
      o.productIds.map(id => id.toString())
    );

    // 2. New user — return most popular books globally
    if (boughtIds.length === 0) {
      const popular = await Order.aggregate([
        { $unwind: '$productIds' },
        { $group: { _id: '$productIds', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]);

      const popularIds = popular.map(p => p._id);
      const popularBooks = await Book.find({ _id: { $in: popularIds } });
      return res.json(popularBooks);
    }

    // 3. Get bought books and their categories
    const boughtBooks = await Book.find({ _id: { $in: boughtIds } });

    // 4. Count category frequency (weighted)
    const categoryCount = {};
    boughtBooks.forEach(b => {
      categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;
    });

    // 5. Get TOP 2 categories instead of just 1
    const topCategories = Object.keys(categoryCount)
      .sort((a, b) => categoryCount[b] - categoryCount[a])
      .slice(0, 2);

    // 6. Find most-ordered books in those categories (not yet bought)
    const popularInCategory = await Order.aggregate([
      { $unwind: '$productIds' },
      { $group: { _id: '$productIds', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const popularIdsSorted = popularInCategory.map(p => p._id.toString());

    // 7. Get candidate books from top categories, excluding bought
    let candidates = await Book.find({
      category: { $in: topCategories },
      _id: { $nin: boughtIds },
    });

    // 8. Sort candidates by global popularity
    candidates.sort((a, b) => {
      const aRank = popularIdsSorted.indexOf(a._id.toString());
      const bRank = popularIdsSorted.indexOf(b._id.toString());
      const aScore = aRank === -1 ? 9999 : aRank;
      const bScore = bRank === -1 ? 9999 : bRank;
      return aScore - bScore;
    });

    // 9. If not enough from top categories, fill with other popular books
    if (candidates.length < 6) {
      const otherBooks = await Book.find({
        category: { $nin: topCategories },
        _id: { $nin: boughtIds },
      }).limit(6 - candidates.length);
      candidates = [...candidates, ...otherBooks];
    }

    res.json(candidates.slice(0, 6));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;