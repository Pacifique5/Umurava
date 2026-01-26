class UserController {
    static async getProfile(req, res) {
        try {
            // Mock user data for now
            const user = {
                id: "1",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                joinedAt: "2024-01-01",
                challengesCompleted: 5,
                skillsLearned: ["JavaScript", "React", "Node.js"]
            };

            res.json(user);
        } catch (error) {
            console.error("Get profile error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateProfile(req, res) {
        try {
            const updates = req.body;
            
            res.json({
                message: "Profile updated successfully",
                data: updates
            });
        } catch (error) {
            console.error("Update profile error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getDashboardStats(req, res) {
        try {
            const stats = {
                totalChallenges: 12,
                completedChallenges: 5,
                ongoingChallenges: 3,
                totalPoints: 1250,
                rank: 15,
                skillsLearned: 8
            };

            res.json(stats);
        } catch (error) {
            console.error("Get dashboard stats error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = UserController;