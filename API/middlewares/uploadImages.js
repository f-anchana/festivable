
const multer = require('multer');
const path = require('path');

function upload(type = 'uploads') {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = 'uploads/'; // fallback
      if (type === 'profile') {
        folder = 'public/profiles/';
      }
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  return multer({ storage });
}

module.exports = upload;
