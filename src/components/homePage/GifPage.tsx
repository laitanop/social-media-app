import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';

function GifPage({ open, handleClose, handleFileGif }) {
    const [gifList, setGifList] = useState([]);

    useEffect(() => {
        searchGif();
    }, []);
    const searchGif = async () => {
        const res = await axios.get(
            `https://api.giphy.com/v1/gifs/trending?api_key=T2GKKAZR6RdG2Zg54rv4PtuMptQVx4vU&limit=25&rating=pg-13`
        );

        setGifList(res.data.data);
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set backup account</DialogTitle>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {gifList.length > 0 &&
                        gifList.map((gif) => (
                            <Grid
                                item
                                xs={6}
                                onClick={() => {
                                    handleFileGif(gif.images.original.url);
                                    handleClose();
                                }}
                            >
                                <img
                                    src={gif.images.original.url}
                                    alt="gif"
                                    height={250}
                                    width={300}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Dialog>
        </div>
    );
}

export default GifPage;
