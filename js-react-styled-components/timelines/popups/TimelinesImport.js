import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Button from '../../../ui/kit/Button/Button';
import Modal from '../../../ui/routines/Modal';
import TimelinesImportButton from '../kit/TimelinesImportButton';

const TimelinesImport = ({ close }) => {
  const [importedTimeline, setImportedTimeline] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const onError = (errorMessage) => {
    setImportedTimeline(null);
    setErrorMessage(errorMessage);
  };

  const onReject = (rejectMessage) => {
    setImportedTimeline(null);
    setErrorMessage(rejectMessage);
  };

  const onAccept = (importedTimeline, fileName) => {
    setErrorMessage('');
    setImportedTimeline(importedTimeline);
    setFileName(fileName);
  };

  return (
    <Modal close={close}>
      <ImportModalContent>
        <ImportHeader>Import</ImportHeader>
        <ImportText>Select a timeline or timeline template file to import</ImportText>
        <TimelinesImportButton
          onAccept={(importedTimeline, fileName) => onAccept(importedTimeline, fileName)}
          onError={(errorMessage) => onError(errorMessage)}
          onReject={(rejectMessage) => onReject(rejectMessage)}
        />
        {importedTimeline && <ImportSuccessMessage>{`${fileName} successfully uploaded`}</ImportSuccessMessage>}
        {errorMessage && <ImportErrorMessage>{errorMessage}</ImportErrorMessage>}
        <ImportModalButtonContainer>
          <CancelButton onClick={close}>Cancel</CancelButton>
          <ImportButton onClick={() => {}}>Import</ImportButton>
        </ImportModalButtonContainer>
      </ImportModalContent>
    </Modal>
  );
};

TimelinesImport.propTypes = {
  close: PropTypes.func,
  title: PropTypes.string,
  createTimelineAction: PropTypes.func,
};

export default TimelinesImport;

const ImportModalContent = styled.div`
  min-width: 450px;
  min-height: 330px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  .btn-import__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 150px;
    margin-bottom: 30px;
    padding: 16px 0 14px 0;
    text-align: center;
    background: var(--cs-accent--invert-color);
    border: 1px dashed var(--cs-general--brand-color);
    border-radius: 2px;
    transition: border 0.15s linear;

    &_on-drag {
      border: 1px solid var(--cs-ui--active-color);
    }
  }

  .btn-import__icon {
    width: 50px;
    height: 50px;
    margin-bottom: 9px;
    fill: var(--cs-general--brand-color);
  }

  .import-timeline__button {
    background-color: var(--cs-general--transparent);
    color: var(--cs-fonts--label-color);
  }
`;

const ImportSuccessMessage = styled.p`
  color: var(--cs-ui--active-color);
  max-width: 320px;
  word-wrap: break-word;
  margin-bottom: 30px;
`;

const ImportErrorMessage = styled.p`
  color: var(--cs-fonts--error-text);
  max-width: 320px;
  word-wrap: break-word;
  margin-bottom: 30px;
`;

const ImportText = styled.p`
  color: var(--cs-fonts--label-color);
  margin-bottom: 30px;
  font-size: 0.8em;
`;

const ImportHeader = styled.h2`
  color: var(--cs-fonts--label-color);
  text-transform: uppercase;
  margin-bottom: 10px;
  font-size: 1.2em;
`;

const ImportModalButtonContainer = styled.div`
  display: flex;
  gap: 48px;
`;

const ImportButton = styled(Button)`
  color: var(--cs-fonts--label-color);
  background-color: var(--cs-general--second-color);
  border-radius: 5px;
  max-width: 105px;
  text-transform: uppercase;
`;

const CancelButton = styled(Button)`
  border-radius: 5px;
  background-color: var(--cs-general--transparent);
  border: 1px solid var(--cs-ui--button-bg-color);
  max-width: 105px;
  text-transform: uppercase;
`;
