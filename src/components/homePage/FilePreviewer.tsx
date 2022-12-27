import { Fab, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const FilePreviewer = ({ handleSelectFile, file, filePickerRef }) => {
    const [previewFileSelected, setPreviewFileSelected] = useState(null);

    const previewFile = () => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = (readerEvent) => {
            setPreviewFileSelected(readerEvent.target.result);
        };
    };
    useEffect(() => {
        previewFile();
        if (file === null) {
            clearFiles();
        }
    }, [file]);

    const clearFiles = () => {
        setPreviewFileSelected(null);
        handleSelectFile(null);
        filePickerRef.current.value = '';
    };

    return (
        <div>
            <div className="btn-container">
                <div style={{ position: 'relative' }}>
                    {file != null && file.type.includes('image') && (
                        <img
                            src={previewFileSelected}
                            alt=""
                            width={'100%'}
                            height={'100%'}
                        />
                    )}
                    {file != null && file.type.includes('video') && (
                        <video
                            controls
                            width={'100%'}
                            height={'100%'}
                            src={previewFileSelected}
                        ></video>
                    )}
                    {previewFileSelected != null && (
                        <Tooltip title="Remove">
                            <Fab
                                size="small"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    background: 'black',
                                    color: 'white',
                                }}
                                onClick={() => clearFiles()}
                            >
                                <CloseIcon />
                            </Fab>
                        </Tooltip>
                    )}
                </div>

                <input
                    ref={filePickerRef}
                    accept="image/*, video/*"
                    onChange={(e) => {
                        handleSelectFile(e.target.files[0]);
                    }}
                    type="file"
                    hidden
                />
            </div>
        </div>
    );
};
export default FilePreviewer;
