const { scrapeWebsite } = require('../services/scrapeService');
const { generateAIReport } = require('../services/geminiService');
const { generatePDF } = require('../services/pdfService');
const { sendEmail } = require('../services/emailService');

/**
 * Handles the report generation workflow.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function generateReport(req, res) {
  try {
    const { name, email, company, website } = req.body;

    // Validate input
    if (!name || !email || !company || !website) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Scrape website
    const scrapedContent = await scrapeWebsite(website);

    // Generate AI report
    const aiReport = await generateAIReport({
      company,
      website,
      scrapedContent: JSON.stringify(scrapedContent),
    });

    // Generate PDF
    const pdfPath = await generatePDF(company, aiReport);

    // Send email
    await sendEmail(email, name, pdfPath);

    // Return success response
    res.status(200).json({ message: 'Report generated and emailed successfully.' });
  } catch (error) {
    console.error('Error in generateReport:', error.message);
    res.status(500).json({ error: 'Failed to generate report.' });
  }
}

module.exports = { generateReport };