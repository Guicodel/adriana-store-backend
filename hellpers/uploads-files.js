const path = require('path');
const {v4: uuid4} = require('uuid');

const uploadFile = (files,validExtensions = ['jpeg','png','jpg','jfif'],folder='') =>{
    return new Promise((resolve,reject)=>{
        const imgFile = files.imgFiles;
        const nameImgSplit = imgFile.name.split('.');
        const extensionFile = nameImgSplit[nameImgSplit.length-1];
        if(!validExtensions.includes(extensionFile)){
            return reject(`La extension ${extensionFile} del archivo/imagen que intenta cargar no corresponde a las validas:${validExtensions}`);

        }
        const tempName = uuid4() + '.' + extensionFile;
        //para guardar en diferentes carpetas si se quisiese:
        //const uploadPath = path.join( __dirname, '../img-uploads/', folder, tempName);
        //folder viene como parametro
        const uploadPath = path.join( __dirname, '../img-uploads/', tempName);
        imgFile.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        })
    });
}

module.exports = {
    uploadFile
}