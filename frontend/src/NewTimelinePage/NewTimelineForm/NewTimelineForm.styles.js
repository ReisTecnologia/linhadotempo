import styled from 'styled-components'
import { colors } from '../../_shared/colors'

export const Icon = styled.div`
  background-color: ${({ color }) => (color ? color : colors.white)};
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  max-width: 2rem !important;
  max-height: 2rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  font-family: Karla;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`

export const ImportExportButtons = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  width: calc(100% - 2.5rem);
  border-bottom: solid 1px ${colors.lightGrey};
  padding: 0 0 1rem 0;
`

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  margin: 0.5rem 0.5rem 0.5rem 0px;
  border: ${({ timelineColor }) =>
    timelineColor ? `solid 1px ${timelineColor}` : `solid 1px ${colors.white}`};
  color: #655;
  border-radius: 5px;
  min-width: 2rem;
  min-height: 2rem;
  width: 2rem;
  height: 2rem;
`
export const Img = styled.img`
  border-radius: 5px;
  width: 1.9rem;
  height: 1.9rem;
  object-fit: cover;
  margin: 0;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 3rem);
  padding: 0 0 1rem 0;
`
export const ImageAndButtonWrapper = styled.div`
  display: flex;
  border-radius: 5px;
  height: 4rem;
  align-items: center;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.lightGrey};
`
export const DeleteButtonWrapper = styled.div`
  width: 100%;
  border-top: ${({ showBorder }) =>
    showBorder && `1px solid ${colors.lightGrey}`};
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
`
export const ExportText = styled.pre`
  margin: 0;
  padding: 1rem;
  width: calc(100% - 2.5rem);
  border: solid 1px ${colors.brown};
  border-radius: 5px;
`
