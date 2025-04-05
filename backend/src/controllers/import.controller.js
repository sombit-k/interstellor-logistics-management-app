


export const  importItems=  async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ success: false, message: "Invalid items data" });
    }

    try {
        const importedItems = await Item.insertMany(items);
        res.status(201).json({ success: true, importedItems });
    } catch (error) {
        console.error("Error importing items:", error);
        res.status(500).json({ success: false, message: "Error importing items" });
    }
}