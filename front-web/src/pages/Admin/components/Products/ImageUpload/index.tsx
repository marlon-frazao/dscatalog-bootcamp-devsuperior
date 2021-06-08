import React, { useState } from 'react';
import { ReactComponent as UploadPlaceholder } from 'core/assets/images/upload-placeholder.svg';
import './styles.scss';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';

const ImageUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
    }

    const uploadImage = (selectedImage: File) => {
        const payload = new FormData();
        payload.append('file', selectedImage);

        makePrivateRequest({
            url: '/products/image',
            method: 'POST',
            data: payload,
            onUploadProgress
        })
            .then(() => {
                console.log('arquivo enviado com sucesso');
            })
            .catch(() => {
                toast.error('Erro ao enviar arquivo!')
            })
            .finally(() => setUploadProgress(0));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];

        if (selectedImage) {
            uploadImage(selectedImage);
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input
                        type="file"
                        id="upload"
                        accept="image/png, image/jpg"
                        onChange={handleChange}
                        hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser JPG ou PNG e não devem ultrapassar <strong>5 mb</strong>.
                </small>
            </div>
            <div className="col-6 upload-placeholder">
                <UploadPlaceholder />
                <div className="upload-progress-container">
                    <div
                        className="upload-progress"
                        style={{ width: `${uploadProgress}%` }}
                    >
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ImageUpload;