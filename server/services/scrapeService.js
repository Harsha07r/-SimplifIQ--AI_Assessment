const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Scrapes website content safely
 */
async function scrapeWebsite(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    const title = $("title").text() || "No title found";

    const metaDescription =
      $('meta[name="description"]').attr("content") ||
      "No description available";

    const headings = $("h1, h2, h3")
      .map((_, el) => $(el).text().trim())
      .get()
      .slice(0, 10);

    const paragraphs = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter((p) => p.length > 50)
      .slice(0, 15);

    return {
      title,
      metaDescription,
      headings,
      paragraphs,
      content: `
        Title: ${title}
        
        Description: ${metaDescription}
        
        Headings:
        ${headings.join("\n")}
        
        Paragraphs:
        ${paragraphs.join("\n")}
      `,
    };
  } catch (error) {
    console.error("Error scraping website:", error.message);

    // Fallback data instead of crashing
    return {
      title: "Company Website",
      metaDescription: "Unable to fetch detailed website data",
      headings: [],
      paragraphs: [],
      content: `
        Website scraping failed.
        Generate a professional generalized business analysis
        and AI recommendations based on the company name and domain.
      `,
    };
  }
}

module.exports = { scrapeWebsite };