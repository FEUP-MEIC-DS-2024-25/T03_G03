const promptService = require('../services/geminiService');

exports.sendPrompt = async (req, res) => {
    try {
        // Extract text from the body of the request
        const prompt = req.body.text;
        console.log('Prompt:', prompt);
        
        if (!prompt) {  // Check if text is missing
            throw new Error('Please provide a prompt.');
        }

        // Send the prompt to the Gemini service
        const result = await promptService.sendPrompt(prompt);
        res.json(result);  // Send the result back as JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};