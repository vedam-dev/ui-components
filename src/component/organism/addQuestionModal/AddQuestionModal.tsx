'use client';

import type React from 'react';
import { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, useTheme, Radio } from '@mui/material';

export interface QuestionType {
  id: string;
  label: string;
}

export interface AddQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (questionTitle: string, questionType: string) => void;
  title?: string;
  subtitle?: string;
  questionTitleLabel?: string;
  questionTitlePlaceholder?: string;
  questionTypeLabel?: string;
  questionTypes?: QuestionType[];
  cancelButtonText?: string;
  createButtonText?: string;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  open,
  onClose,
  onCreate,
  title = 'Add New Question',
  subtitle = 'Enter details for the question',
  questionTitleLabel = 'Question Title',
  questionTitlePlaceholder = 'Eg. Two Sum',
  questionTypeLabel = 'Question Type',
  questionTypes = [
    { id: 'mcq', label: 'MCQ' },
    { id: 'mcms', label: 'MCMS' },
    { id: 'dsa', label: 'DSA' },
    { id: 'web_development', label: 'Web Development' },
    { id: 'numerical', label: 'Numerical' },
    { id: 'descriptive', label: 'Descriptive' },
  ],
  cancelButtonText = 'Cancel',
  createButtonText = 'Create',
}) => {
  const theme = useTheme();

  const [questionTitle, setQuestionTitle] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const handleQuestionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(event.target.value);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleCreate = () => {
    if (onCreate && questionTitle && selectedType) {
      onCreate(questionTitle, selectedType);
    }
    handleClose();
  };

  const handleClose = () => {
    setQuestionTitle('');
    setSelectedType('');
    onClose();
  };

  const isCreateDisabled = !questionTitle || !selectedType;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-question-modal"
      aria-describedby="add-question-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '672px' },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '24px',
          padding: '36px',
          outline: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Title */}
        <Box sx={{ mb: '20px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '28px',
              lineHeight: '39px',
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '20px',
              lineHeight: '25px',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Question Title Input */}
        <Box sx={{ mb: '20px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '23px',
              color: theme.palette.text.primary,
              mb: '8px',
            }}
          >
            {questionTitleLabel}
          </Typography>
          <TextField
            fullWidth
            placeholder={questionTitlePlaceholder}
            value={questionTitle}
            onChange={handleQuestionTitleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                lineHeight: '20px',
                backgroundColor: '#FFF',
                fontSize: '16px',
                '& fieldset': {
                  borderColor: '#C7C7C7',
                },
                '&:hover fieldset': {
                  borderColor: '#C7C7C7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C7C7C7',
                  borderWidth: '1px',
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '13px 20px',
              },
            }}
          />
        </Box>

        {/* Question Type Selection */}
        <Box sx={{ mb: '20px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              color: theme.palette.text.primary,
              mb: '8px',
            }}
          >
            {questionTypeLabel}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: '8px',
            }}
          >
            {questionTypes.map((type) => (
              <Box
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 10px',
                  borderRadius: '12px',
                  border: '1px solid #C7C7C7',
                  backgroundColor: '#FFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    // borderColor: theme.palette.primary.main,
                    // backgroundColor: selectedType === type.id ? '#F5F0FF' : '#FAFAFA',
                  },
                }}
              >
                <Radio
                  checked={selectedType === type.id}
                  value={type.id}
                  sx={{
                    padding: 0,
                    marginRight: '12px',
                    color: '#E0E0E0',
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: selectedType === type.id ? 600 : 400,
                    color: theme.palette.text.primary,
                  }}
                >
                  {type.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', mt: '20px' }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.common.white,
              fontSize: '16px',
              lineHeight: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '13px 24px',
              textTransform: 'none',
              '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={isCreateDisabled}
            sx={{
              backgroundColor: theme.palette.primary.main,
              fontSize: '16px',
              fontWeight: 500,
              borderRadius: '12px',
              padding: '14px 24px',
              lineHeight: '16px',
              color: theme.palette.common.white,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              '&:disabled': {
                backgroundColor: '#BDBDBD',
                color: '#FFF',
              },
            }}
          >
            {createButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;
