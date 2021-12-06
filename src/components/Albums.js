import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Album from './Album';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums`, {
        params: {
          _limit: 12,
        },
      })
      .then((albumData) => {
        setAlbums(albumData.data);
        console.log(albumData.data);
      });
  }, []);

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
      <Typography variant="h2" pb={6}>
        Photo Albums
      </Typography>

      <Grid
        container
        rowSpacing={5}
        columnSpacing={3}
        ml={0}
        justifyContent="center"
        columns={16}
      >
        {albums.length < 1
          ? Array.from(
              new Array(12).fill(
                <Grid item md={3} m={3}>
                  {' '}
                  <Skeleton
                    variant="rectangular"
                    animation={'wave'}
                    width={200}
                    height={200}
                  />
                </Grid>
              )
            )
          : albums.map((album) => {
              return (
                <Grid item md={3} m={2} key={album.id}>
                  <AlbumLink to={`/Photos/${album.title}/${album.id}`}>
                    <AlbumPaper elevation={20} rounded="true">
                      <Album AlbumTitle={<AlbumText>{album.title}</AlbumText>}>
                        <AlbumText>{album.title}</AlbumText>
                      </Album>
                    </AlbumPaper>
                  </AlbumLink>
                </Grid>
              );
            })}
      </Grid>
    </Container>
  );
}

export default Albums;

const AlbumPaper = styled(Paper)({
  width: 200,
  height: 200,
  padding: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopRightRadius: '15px',
  borderBottomRightRadius: '15px',
  boxSizing: 'border-box',
  '&hover': {
    display: 'none',
  },
});

const AlbumText = styled('div')({
  textDecoration: 'none',
  color: '#f9f9f9',
  textAlign: 'center',
  textTransform: 'capitalize',
  padding: '0 10px',
  fontSize: '1.1rem',
});

const AlbumLink = styled(Link)({
  textDecoration: 'none',
});
