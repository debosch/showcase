import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components/macro';
import { ReactComponent as ImportIcon } from '../../../../assets/images/upload-file-icon.svg';

const MAX_SIZE = 1000000;

const TimelinesImportButton = ({ children, className, onReject, onAccept, onError }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      const acceptedFile = acceptedFiles[0];

      const reader = new FileReader();
      reader.readAsBinaryString(acceptedFile);
      reader.onerror = () => {
        onError && onError('Error occurred: ' + reader.error);
      };
      reader.onabort = () => {
        onError && onError('Loading aborted: ' + acceptedFile.name);
      };
      reader.onload = () => {
        const importedTimeline = JSON.parse(reader.result.toString());
        onAccept && onAccept(importedTimeline, acceptedFile.name);
      };
    }

    if (rejectedFiles.length) {
      const rejectMessage = `File must be less than ${MAX_SIZE / 1000}KB and of type .ndjson`;
      onReject && onReject(rejectMessage);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.ndjson', maxSize: MAX_SIZE });

  const classes = classNames('btn-import__wrapper', { 'btn-import__wrapper_on-drag': isDragActive }, className);

  return (
    <>
      <ImportButtonContainer className={classes} {...getRootProps()}>
        <ImportInput {...getInputProps({ accept: '.ndjson' })} />

        <ImportIcon className="btn-import__icon" />

        <ImportButton type="button" className="import-timeline__button">
          Select or drag and drop a valid timelines_export.ndjson file
        </ImportButton>

        {children}
      </ImportButtonContainer>
      <p />
    </>
  );
};

TimelinesImportButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dropzoneProps: PropTypes.object,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onError: PropTypes.func,
};

const ImportButtonContainer = styled.div``;

const ImportInput = styled.input``;

const ImportButton = styled.button``;

export default TimelinesImportButton;
