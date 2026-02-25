import multer from "multer"; // Import multer for handling file uploads

const storage = multer.diskStorage({}); // Configure multer to store uploaded files in memory

const upload = multer({ storage }); // Create a multer instance with the defined storage configuration

export default upload; // Export the multer instance for use in other parts of the application