class ContactController {
    static async submitContact(req, res) {
        try {
            const { name, email, message } = req.body;

            // Here you would typically save to database or send email
            console.log("Contact form submission:", { name, email, message });

            res.json({
                message: "Contact form submitted successfully",
                data: { name, email, message }
            });
        } catch (error) {
            console.error("Contact form error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = ContactController;