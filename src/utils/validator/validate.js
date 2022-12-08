
module.exports = {
    validateMedia: (file) => {
        let ext = ['png', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'webp',
        'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi','wmv','mov']
        let fileExt = file.originalname.split('.')
        return ext.includes(fileExt[fileExt.length-1])
    }
}