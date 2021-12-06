import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';


export default function Photos() {
  const { id, title } = useParams();
  const [photos, setPhotos] = useState([]);
  const [activePhoto, setActivePhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (valueId) => {
    let Photo = photos.filter((photo) => photo.id === valueId);
    console.log(Photo);
    setActivePhoto(Photo);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`, {
        params: {
          _limit: 15,
        },
      })
      .then((photos) => {
        setPhotos(photos.data);
        console.log(photos.data);
      });
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" pb={6} style={{ textTransform: 'capitalize' }}>
        {title}
      </Typography>

      <Grid container spacing={5} justifyContent="flex-start">
        {photos.length < 1
          ? Array.from(
              new Array(15).fill(
                <Grid item md={3} >
                  {' '}
                  <Skeleton
                    variant="rectangular"
                    animation={'wave'}
                    width={250}
                    height={250}
                  />
                </Grid>
              )
            )
          : photos.map((photo) => {
              return (
                <Grid item key={photo.id}>
                  <PhotoLink onClick={() => handleClickOpen(photo.id)}>
                    <Photo elevation={20} rounded="true">
                      <PhotoImg src={photo.thumbnailUrl} />
                      <PhotoText>
                        <Typography variant="p">{photo.title}</Typography>
                      </PhotoText>
                    </Photo>
                  </PhotoLink>
                </Grid>
              );
            })}
      </Grid>
      {activePhoto && (
        <Dialog open={open} onClose={() => handleClose()}>
          <DialogImg src={activePhoto[0].url} />
          <DialogTitle style={{ textAlign: 'center' }}>
            {activePhoto[0].title}
          </DialogTitle>
        </Dialog>
      )}
    </Container>
  );
}

const PhotoLink = styled('a')({
  textDecoration: 'none',
});

const Photo = styled(Paper)({
  width: 250,
  height: 250,
  backgroundColor: '#000000',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  border: '#f9f9f9 solid 10px',
  boxSizing: 'border-box',
  '&:hover': {
    transform: 'scale(1.4)',
    transition: 'transform .5s ease-in-out ',
  },
});

const PhotoText = styled('div')({
  color: '#000000',
  textAlign: 'center',
  textTransform: 'capitalize',
  alignSelf: 'flex-end',
  backgroundColor: '#f9f9f9',
  width: 'inherit',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const PhotoImg = styled('img')({
  width: '100%',
  height: 'calc(100% - 60px)',
});

const DialogImg = styled('img')({
  border: 'white solid 20px',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
});
