export const getMoveValue = (value, imagePath, imageToCheck) => {
    let image = ''
    
    if (imagePath != '' && imagePath != undefined) {
        image = imagePath.split('/')[1]
    }

    if (value == 0) {
        return 2
    }
    else if (value == 1 && image == imageToCheck) {
        return 3
    }

    return value
}