import React from 'react';

function GifPreview({ file }) {
    return (
        <div>
            {file && (
                <img src={file} alt="gif" width={'100%'} height={'100%'} />
            )}
        </div>
    );
}

export default GifPreview;
