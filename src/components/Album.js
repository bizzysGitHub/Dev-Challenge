import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import '../css/Album.css';

function Album({ AlbumTitle }) {
  return (
    <div className="book">
      <div className="back"></div>
      <div className="page6">
        <Photo>
          <p>For More</p>
        </Photo>
      </div>
      <div className="page5">
        <Photo>
          <p>Click Here</p>
        </Photo>
      </div>
      <div className="page4"></div>
      <div className="page3"></div>
      <div className="page2"></div>
      <div className="page1"></div>
      <div className="front">
        <Typography component="h5" pt={8}>
          {AlbumTitle}{' '}
        </Typography>
      </div>
    </div>
  );
}

export default Album;

const Photo = styled(Paper)({
  width: 90,
  height: 70,
  backgroundColor: '#000000',
  padding: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'white solid 10px',
  borderBottomWidth: ' 30px',
  position: 'absolute',
  top: '20%',
  right: '20%',
  fontFamily: 'Fuzzy Bubbles , cursive',
});
