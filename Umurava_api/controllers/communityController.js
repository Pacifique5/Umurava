class CommunityController {
    static async getCommunityData(req, res) {
        try {
            const communityData = {
                totalMembers: 1250,
                activeChallenges: 8,
                completedProjects: 45,
                topSkills: ["JavaScript", "Python", "React", "Node.js", "Machine Learning"],
                recentActivities: [
                    {
                        id: 1,
                        user: "Alice Johnson",
                        action: "completed",
                        challenge: "Web Development Bootcamp",
                        timestamp: "2024-01-20T10:30:00Z"
                    },
                    {
                        id: 2,
                        user: "Bob Smith",
                        action: "joined",
                        challenge: "AI/ML Challenge",
                        timestamp: "2024-01-20T09:15:00Z"
                    }
                ]
            };

            res.json(communityData);
        } catch (error) {
            console.error("Get community data error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = CommunityController;