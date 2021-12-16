import React from 'react'
import { MicButton } from '../../../../_shared/MicButton'
import { XIcon } from '../../../../_shared/XIcon'
import {
  ConfirmDateButton,
  ConfirmeDateWrapper,
  DateResult,
  MicButtonAndTranscriptWrapper,
  SpeechToTextWrapper,
  TranscriptText,
  XIconWrapper,
} from './SpeechDateToText.styles'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import PropTypes from 'prop-types'
import { textToDate } from './textToDate'
import { convertDateObjectToString } from './convertDateObjectToString'

export const SpeechDateToText = ({
  entry,
  setEntry,
  enableSpeechToText,
  setEnableSpeechToText,
}) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  const listenContinuously = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'pt-br' })
  }

  const handleMicClick = () => {
    resetTranscript()
    setEnableSpeechToText({
      dateDisplayMic: true,
      endDateDisplayMic: false,
    })
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      listenContinuously()
    }
  }

  const confirmDateFromTranscript = (dateObject) => {
    const newEntry = { ...entry }
    newEntry.day = dateObject.day ? parseInt(dateObject.day) : ''
    newEntry.month = dateObject.month ? dateObject.month : ''
    newEntry.year = dateObject.year
    setEntry(newEntry)
    SpeechRecognition.stopListening()
    resetTranscript()
  }

  const enabled = enableSpeechToText.dateDisplayMic
  const listeningAndEnabled = listening && enabled
  return (
    <SpeechToTextWrapper>
      <MicButtonAndTranscriptWrapper>
        <MicButton
          color={listeningAndEnabled && 'red'}
          onClick={handleMicClick}
        />
        <TranscriptText>{enabled ? transcript : null}</TranscriptText>
      </MicButtonAndTranscriptWrapper>
      {transcript.length > 0 && enabled ? (
        <ConfirmeDateWrapper>
          <ConfirmDateButton
            onClick={() => confirmDateFromTranscript(textToDate(transcript))}
          >
            &#10003;
          </ConfirmDateButton>
          <DateResult>
            {convertDateObjectToString(textToDate(transcript))}
          </DateResult>
          <XIconWrapper>
            <XIcon onClick={resetTranscript} />
          </XIconWrapper>
        </ConfirmeDateWrapper>
      ) : null}
    </SpeechToTextWrapper>
  )
}

SpeechDateToText.propTypes = {
  entry: PropTypes.object,
  setEntry: PropTypes.func,
  isPeriodEnd: PropTypes.bool,
  enableSpeechToText: PropTypes.object,
  setEnableSpeechToText: PropTypes.func,
}
