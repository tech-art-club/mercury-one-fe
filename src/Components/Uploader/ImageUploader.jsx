import { useEffect, useState } from 'react';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UrlBuilder } from '@bytescale/sdk';
import styles from './ImageUploader.module.css';

const options = {
  apiKey: 'public_FW25bwmAyiUWaTrLB9BxDXCypLA5', // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  mimeTypes: ['image/*'],
  editor: {
    images: {
      cropShape: 'rect',
      cropRatio: 1 / 1, // "1" is enforced for "circ".
    },
  },
  styles: {
    colors: {
      primary: '#377dff',
    },
  },
};

const MyDropzone = ({ setFiles }) => (
  <UploadDropzone
    options={options}
    onUpdate={({ uploadedFiles }) =>
      console.log(`Files: ${uploadedFiles.map((x) => x.fileUrl).join('\n')}`)
    }
    onComplete={setFiles}
    width="300px"
    height="300px"
  />
);

const MyUploadedFiles = ({ style, files }) =>
  files.map((file) => {
    // Save 'filePath' to your DB, and construct URLs using UrlBuilder:
    const { filePath, accountId } = file;
    // Build an image transformation URL for the uploaded file.
    // Remove 'options' to get the URL to the original file:
    const fileUrl = UrlBuilder.url({
      filePath,
      accountId,
      options: {
        transformation: 'preset',
        transformationPreset: 'thumbnail',
      },
    });
    return (
      <div style={style} key={accountId}>
        <img src={fileUrl} alt="userImage" className={styles.customImage} />
      </div>
    );
  });

const ImageUploader = ({ style, index, handleAddImage }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    handleAddImage(index, files[0]?.fileUrl);
  }, [files, handleAddImage, index]);

  return (
    <>
      {files.length ? (
        <MyUploadedFiles files={files} style={style} />
      ) : (
        <MyDropzone setFiles={setFiles} />
      )}
    </>
  );
};

export default ImageUploader;
