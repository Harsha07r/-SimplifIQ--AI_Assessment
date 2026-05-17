async function generateAIReport({ company, website, scrapedContent }) {
  try {
    const title = scrapedContent.title || company;
    const description =
      scrapedContent.metaDescription ||
      "The company maintains an online business presence.";

    const headings = scrapedContent.headings?.join(", ") || "";

    return `
# Company Overview

${title} operates through ${website}. 

Business Description:
${description}

Key Website Themes:
${headings}

# Business Strengths
- Established online presence
- Clear business positioning
- Digital scalability potential
- Brand-focused communication

# Growth Opportunities
- Improve customer engagement workflows
- Optimize website conversion strategy
- Enhance analytics and reporting
- Automate repetitive operational tasks

# AI Automation Recommendations
- AI-powered customer support chatbot
- Lead qualification automation
- Personalized customer engagement systems
- AI-driven analytics dashboards

# Website/User Experience Suggestions
- Improve mobile responsiveness
- Enhance page speed optimization
- Strengthen CTA visibility
- Improve content readability and structure

# Competitive Advantage Suggestions
- Leverage AI automation for operational efficiency
- Build stronger personalization systems
- Use data-driven customer insights
- Improve digital onboarding experience

# Final Recommendations

${company} demonstrates strong potential for digital optimization and AI-driven operational improvements. Strategic implementation of automation workflows and customer intelligence systems can significantly improve scalability and customer engagement.
`;
  } catch (error) {
    console.error("Report Generation Error:", error.message);
    throw new Error("Failed to generate AI report");
  }
}

module.exports = { generateAIReport };