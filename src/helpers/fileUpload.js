
export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/do0xanjxy/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if (!resp.ok) {
            throw new Error('No se pudo subir la imagen');
        }

        const cloudResp = await resp.json();
        return cloudResp.secure_url; // Devuelve la URL de la imagen subida
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
};

