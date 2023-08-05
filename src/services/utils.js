
//function to validate image format
exports.isValidFile = function(file) {
    const type = file.mimetype.split('/').pop()
    
    const validTypes = ['jpg', 'jpeg', 'png']
    // console.log(validTypes.indexOf(type));
    if(validTypes.indexOf(type)!== -1)
        return true 
    return false
}