import prisma from "@/lib/prisma";


// Function to retrieve all inventory types
const getAllInventoryTypes = async () => {
    try {
        const inventoryTypes = await prisma.inventoryType.findMany();
        return inventoryTypes;
    } catch (error) {
        console.error('Error retrieving inventory types:', error);
        throw error;
    }
};

// Function to create a new inventory type
const createInventoryType = async (name: string) => {
    try {
        const newInventoryType = await prisma.inventoryType.create({
            data: {
                name,
            },
        });
        return newInventoryType;
    } catch (error) {
        console.error('Error creating inventory type:', error);
        throw error;
    }
}

export { getAllInventoryTypes, createInventoryType };