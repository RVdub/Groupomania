const HOST = "http://127.0.0.1:3000/";

// Pour visualiser l'instance FormData
function getFormData(formData) {
    let objectData = {};
    formData.forEach(function (value, key) {
        objectData[key] = value;
    });
    return(objectData);
}

