import { useState, useEffect } from 'react';
import { Upload, message, Avatar, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const { Text } = Typography;

const AvatarUpload = ({ avatarUrl, onAvatarChange, darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (avatarUrl) {
      setImageUrl(avatarUrl);
    }
  }, [avatarUrl]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        onAvatarChange(url);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const uploadButton = (
    <div className={darkMode ? 'text-gray-300' : ''}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className='text-center'>
      <ImgCrop rotate>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customRequest}
        >
          {imageUrl ? (
            <Avatar
              src={imageUrl}
              size={100}
              style={{ width: '100%', height: '100%' }}
              className='border-2 border-gray-200'
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
      <Text
        className={`mt-2 block text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        Click to upload patient photo
      </Text>
    </div>
  );
};

export default AvatarUpload;
