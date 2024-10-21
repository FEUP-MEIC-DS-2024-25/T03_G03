const promptService = require('../services/geminiService');

exports.sendPrompt = async (req, res) => {
    try {
        const prompt = req.query.text;
        console.log('Prompt:', prompt);
        if (prompt === undefined) {
            throw new Error('Please provide a prompt.');
        }
        else {
            const result = await promptService.sendPrompt(prompt);
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
