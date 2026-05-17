const express = require('express');
const { generateReport } = require('../controllers/reportController');

const router = express.Router();

// POST /api/generate-report
router.post('/generate-report', generateReport);

module.exports = router;