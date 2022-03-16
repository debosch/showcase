import styled from '@emotion/styled';

export const EditorWrapper = styled.div`
  width: 100%;
  border-radius: 8px;

  .ql-container {
    min-height: 20em;

    &.ql-snow {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  .ql-toolbar.ql-snow {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;
