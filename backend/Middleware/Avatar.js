const multer = require('multer');
const path = require('path');

// Multer configuration
module.exports = multer({
  storage: multer.diskStorage({}),  // Empty object will use default storage in memory
  fileFilter: (req, file, cb) => {
    // Extract file extension
    let ext = path.extname(file.originalname).toLowerCase();
    
    // Allow only certain file types
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('File type is not supported'), false);
    }
    cb(null, true);  // If file type is valid, accept the file
  },
});
