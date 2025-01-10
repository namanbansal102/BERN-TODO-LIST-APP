import React from 'react';

const DemoVideo = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>Demo Video</div>
      <center>

      <video
        autoPlay
        controls
        style={{ width: '100%', maxWidth: '720px', height: 'auto', marginTop: '20px' }}
        src="https://firebasestorage.googleapis.com/v0/b/osc-official-b3cab.appspot.com/o/files%2FBlockchain-Based%20Hospital%20Record%20Management%20System%20(1).mp4?alt=media&token=696098f6-c417-4a27-a0dd-15a4f581b317"
        />
        </center>
    </div>
  );
}

export default DemoVideo;
