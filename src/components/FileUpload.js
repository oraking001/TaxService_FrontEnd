import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const FileUpload = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  if(!isAuthenticated){
      return <Navigate to="/login" />
  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('File uploaded');
    } catch(err) {
      if(err.response.status === 500) {
        setMessage('There was a problem witht he server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
        <div className='container' style={{ width: '600px', position:'absolute', top: '40%', left: '50%', transform: "translate(-50%, -50%)" }}>
        <h1>File Upload</h1>
      { message ? <Message msg={ message } /> : null }
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={ uploadPercentage } />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/"><button className="btn btn-primary mt-4">Back to Home</button></Link>
            <input
            type="submit"
            defaultValue="Upload"
            className="btn btn-primary mt-4"
            />
        </div>
      </form>
      { uploadedFile ? <div className="row mt-5">
        <div className="col-md-6 m-auto"></div>
          <h3 className="text-center">{ uploadedFile.fileName }</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
        </div> : null }
        </div>
    </Fragment>
  );
};

export default FileUpload;
