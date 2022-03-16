import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as CreateIcon } from '../../../assets/images/plus.svg';
import { ReactComponent as ImportIcon } from '../../../assets/images/upload-file-icon.svg';
import Button from '../../ui/kit/Button/Button';
import TimelinesImport from './popups/TimelinesImport';

const TimelinesControls = () => {
  const [isImportOpen, setImportOpen] = useState(false);

  const toggleImportModal = () => {
    setImportOpen(!isImportOpen);
  };

  return (
    <ControlButtonsWrapper>
      {isImportOpen && <TimelinesImport close={toggleImportModal} title="Import" />}
      <ImportButton onClick={toggleImportModal}>
        <ControlButtonText>
          Import
          <ImportIcon />
        </ControlButtonText>
      </ImportButton>
      <CreateTimelineButton>
        <ControlButtonText>
          <CreateIcon />
          Create new timeline
        </ControlButtonText>
      </CreateTimelineButton>
    </ControlButtonsWrapper>
  );
};

const ControlButtonsWrapper = styled.div`
  display: inline-block;
`;

const ImportButton = styled(Button)`
  border-radius: 5px;
  margin-right: 20px;
  background-color: var(--cs-general--transparent);
  border: 1px solid var(--cs-ui--button-bg-color);
  max-width: fit-content;
`;

const ControlButtonText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CreateTimelineButton = styled(Button)`
  border-radius: 5px;
`;

export default TimelinesControls;
