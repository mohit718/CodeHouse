import Problem from '../models/Problem.js';

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json(problems);
    } catch (error) {
        console.error('❌Failed to fetch problems.', error);
        res.status(500).json({ message: 'Failed to fetch problems.' });
    }
}

export const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found.' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error('❌Failed to fetch problem.', error);
        res.status(500).json({ message: 'Failed to fetch problem.' });
    }
};