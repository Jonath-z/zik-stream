import React, { useState, useCallback } from 'react';
import { Row, Col, Input, Button, Space } from 'antd';
import client from '../../utils/helpers/ipfs-client';
import axios from 'axios';

const CreateArtist = () => {
  const [artistIds, setArtistIds] = useState({
    artistName: '',
    artistProfileUrl: '',
  });
  const [progress, setProgress] = useState(0);

  const calulProgress = (fileSize, Currentprogress) => {
    const progress = (Currentprogress * 100) / fileSize;
    return progress;
  };

  const onProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const added = await client.add(file, {
      progress: (prog) => setProgress(calulProgress(file.size, prog)),
    });
    const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    setArtistIds({ ...artistIds, artistProfileUrl: url });
  };

  const uploadArtist = async () => {
    if (!artistIds.artistName || !artistIds.artistProfileUrl) return;
    const response = await axios.post('/api/upload/uploadArtist', {
      artistIds,
    });
    if (response.status === 200) {
      window.alert('Artist uploaded');
      setArtistIds({
        artistName: '',
        artistProfileUrl: '',
      });
      setProgress(0);
    } else {
      alert('error accurred when uploading the artist');
    }
  };

  return (
    <Row className="flex flex-col justify-center">
      <Col>
        <Space direction="vertical">
          <label htmlFor="profile-photo">Artist profile photo</label>
          <Input
            type="file"
            name="profile-photo"
            placeholder="Upload Song"
            onChange={onProfilePhotoChange}
            className={`bg-[#00C3FF] bg-opacity-[${coverUploadProgress}]`}
          />
          {progress && <progress max={100} value={progress} />}
          <label htmlFor="artist-name">Artist name</label>
          <Input
            type="text"
            name="artist-name"
            placeholder="Title"
            onChange={(e) =>
              setArtistIds({
                ...artistIds,
                artistName: e.target.value,
              })
            }
          />
          <Button onClick={uploadArtist}>Upload Artist</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default CreateArtist;
