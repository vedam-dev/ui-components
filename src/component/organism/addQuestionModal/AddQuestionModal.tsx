'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Radio,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { CoreTheme } from '../../../theme/core-theme';

export interface QuestionType {
  id: string;
  label: string;
}

export interface TitleTypographyProps {
  fontWeight?: number | string;
  fontSize?: string;
  lineHeight?: string;
  color?: string;
}

export interface SubtitleTypographyProps {
  fontSize?: string;
  lineHeight?: string;
  color?: string;
  fontWeight?: number | string;
}

export interface InitialData {
  questionTitle?: string;
  questionLabel?: string;
  maximumMarks?: string;
  questionType?: string;
  difficulty?: string;
}

export interface AddQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (
    questionTitle: string,
    questionLabel: string,
    questionType: string,
    difficulty: string,
    maximumMarks: string
  ) => void;
  title?: string;
  subtitle?: string;
  titleTypographyProps?: TitleTypographyProps;
  subtitleTypographyProps?: SubtitleTypographyProps;
  questionTitleLabel?: string;
  questionTitlePlaceholder?: string;
  questionLabelLabel?: string;
  questionLabelPlaceholder?: string;
  maximumMarksLabel?: string;
  maximumMarksPlaceholder?: string;
  showMaximumMarks?: boolean;
  difficultyLabel?: string;
  questionTypeLabel?: string;
  showQuestionType?: boolean;
  questionTypes?: QuestionType[];
  cancelButtonText?: string;
  createButtonText?: string;
  initialData?: InitialData;
  requireMaximumMarks?: boolean;
}

const MD_ITEMS_PER_PAGE = 4;

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  open,
  onClose,
  onCreate,
  title = 'Add New Question',
  subtitle = 'Enter details for the question',
  titleTypographyProps,
  subtitleTypographyProps,
  questionTitleLabel = 'Question Title',
  questionTitlePlaceholder = 'Eg. Two Sum',
  questionLabelLabel = 'Question Label',
  questionLabelPlaceholder = 'Eg. 123',
  maximumMarksLabel = 'Maximum Marks',
  maximumMarksPlaceholder = 'Eg. 10',
  showMaximumMarks = false,
  difficultyLabel = 'Difficulty',
  questionTypeLabel = 'Question Type',
  showQuestionType = true,
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
  initialData,
  requireMaximumMarks = false,
}) => {
  const theme = useTheme() as CoreTheme;

  const isMd = useMediaQuery(theme.breakpoints.down(1200));

  const [questionTitle, setQuestionTitle] = useState<string>(initialData?.questionTitle ?? '');
  const [questionLabel, setQuestionLabel] = useState<string>(initialData?.questionLabel ?? '');
  const [maximumMarks, setMaximumMarks] = useState<string>(initialData?.maximumMarks ?? '');
  const [selectedType, setSelectedType] = useState<string>(initialData?.questionType ?? '');
  const [difficulty, setDifficulty] = useState<string>(initialData?.difficulty ?? 'MEDIUM');

  // Pagination state for Question Type on md screens
  const [currentTypePage, setCurrentTypePage] = useState<number>(0);

  // Derived pagination values
  const totalTypePages = isMd ? Math.ceil(questionTypes.length / MD_ITEMS_PER_PAGE) : 1;
  const visibleTypes = isMd
    ? questionTypes.slice(
        currentTypePage * MD_ITEMS_PER_PAGE,
        (currentTypePage + 1) * MD_ITEMS_PER_PAGE
      )
    : questionTypes;

  const canGoPrev = currentTypePage > 0;
  const canGoNext = currentTypePage < totalTypePages - 1;

  useEffect(() => {
    if (open) {
      setQuestionTitle(initialData?.questionTitle ?? '');
      setQuestionLabel(initialData?.questionLabel ?? '');
      setMaximumMarks(initialData?.maximumMarks ?? '');
      setSelectedType(initialData?.questionType ?? '');
      setDifficulty(initialData?.difficulty ?? 'MEDIUM');
      setCurrentTypePage(0); 
    }
  }, [open, initialData]);

  const handleQuestionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(event.target.value);
  };

  const handleQuestionLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuestionLabel(value);
    }
  };

  const handleMaximumMarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setMaximumMarks(value);
    }
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleDifficultyChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDifficulty: string | null
  ) => {
    if (newDifficulty !== null) {
      setDifficulty(newDifficulty);
    }
  };

  const handleCreate = () => {
    if (onCreate && !isCreateDisabled) {
      onCreate(questionTitle, questionLabel, selectedType, difficulty, maximumMarks);
    }
    handleClose();
  };

  const handleClose = () => {
    setQuestionTitle('');
    setQuestionLabel('');
    setMaximumMarks('');
    setSelectedType('');
    setDifficulty('MEDIUM');
    setCurrentTypePage(0);
    onClose();
  };

  const isCreateDisabled =
    !questionTitle ||
    !questionLabel ||
    (showQuestionType && !selectedType) ||
    (showMaximumMarks && requireMaximumMarks && !maximumMarks);

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: { md: '10px', lg: '12px' },
      lineHeight: { md: '18px', lg: '20px' },
      backgroundColor: theme.palette.common.white,
      fontSize: { md: '14px', lg: '16px' },
      '& fieldset': {
        borderColor: theme.palette.grey[300],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[300],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[300],
        borderWidth: '1px',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: { md: '9px', lg: '13px 20px' },
    },
  };

  const fieldLabelSx = {
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: { md: '6px', lg: '8px' },
    fontSize: { md: '14px', lg: '18px' },
    lineHeight: { md: '18px', lg: '23px' },
  };

  const arrowBtnSx = (enabled: boolean) => ({
    padding: '2px',
    width: { md: '16px', lg: '24px' },
    height: { md: '16px', lg: '24px' },
    border: `1px solid ${enabled ? theme.palette.primary.main : theme.palette.grey[300]}`,
    borderRadius: '50%',
    color: enabled ? theme.palette.primary.main : theme.palette.grey[400],
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: enabled ? theme.vd.palette.surfaceMuted : theme.palette.common.white,
    },
    transition: 'all 0.2s ease',
  });

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
          maxHeight: { md: '452px', lg: '90vh' },
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '24px',
          padding: { md: '18px', lg: '36px' },
          outline: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Title */}
        <Box sx={{ mb: { md: '12px', lg: '20px' } }}>
          <Typography
            sx={{
              fontWeight: titleTypographyProps?.fontWeight ?? 600,
              fontSize: { md: '16px', lg: titleTypographyProps?.fontSize ?? '28px' },
              lineHeight: { md: '20px', lg: titleTypographyProps?.lineHeight ?? '39px' },
              color: titleTypographyProps?.color ?? theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontWeight: subtitleTypographyProps?.fontWeight ?? 400,
              color: subtitleTypographyProps?.color ?? theme.palette.text.secondary,
              fontSize: { md: '12px', lg: subtitleTypographyProps?.fontSize ?? '20px' },
              lineHeight: { md: '15px', lg: subtitleTypographyProps?.lineHeight ?? '25px' },
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        {/* Question Title Input */}
        <Box sx={{ mb: { md: '12px', lg: '20px' } }}>
          <Typography sx={fieldLabelSx}>{questionTitleLabel}</Typography>
          <TextField
            fullWidth
            placeholder={questionTitlePlaceholder}
            value={questionTitle}
            onChange={handleQuestionTitleChange}
            sx={textFieldSx}
          />
        </Box>

        <Box
          sx={{
            mb: { md: '12px', lg: '20px' },
            display: 'grid',
            gridTemplateColumns: showMaximumMarks ? '1fr 1fr' : '1fr',
            gap: { md: '12px', lg: '16px' },
          }}
        >
          <Box>
            <Typography sx={fieldLabelSx}>{questionLabelLabel}</Typography>
            <TextField
              fullWidth
              placeholder={questionLabelPlaceholder}
              value={questionLabel}
              onChange={handleQuestionLabelChange}
              inputProps={{ inputMode: 'numeric' }}
              sx={textFieldSx}
            />
          </Box>

          {showMaximumMarks && (
            <Box>
              <Typography sx={fieldLabelSx}>{maximumMarksLabel}</Typography>
              <TextField
                fullWidth
                placeholder={maximumMarksPlaceholder}
                value={maximumMarks}
                onChange={handleMaximumMarksChange}
                inputProps={{ inputMode: 'numeric' }}
                sx={textFieldSx}
              />
            </Box>
          )}
        </Box>

        {/* Difficulty Selection */}
        <Box sx={{ mb: { md: '12px', lg: '20px' } }}>
          <Typography sx={fieldLabelSx}>{difficultyLabel}</Typography>
          <ToggleButtonGroup
            value={difficulty}
            exclusive
            onChange={handleDifficultyChange}
            sx={{
              gap: { md: '10px', lg: '14px' },
              '& .MuiToggleButtonGroup-grouped': {
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: '100px !important',
                margin: 0,
                '&:not(:first-of-type)': {
                  borderLeft: `1px solid ${theme.palette.grey[300]}`,
                  marginLeft: 0,
                },
              },
              '& .MuiToggleButton-root': {
                fontSize: { md: '10px', lg: '16px' },
                lineHeight: { md: '13px', lg: '20px' },
                fontWeight: 500,
                textTransform: 'none',
                padding: { md: '2.5px 15px', lg: '12px 24px' },
                minWidth: { md: '65px', lg: '122px' },
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.common.white,
                '&.Mui-selected': {
                  '&[value="EASY"]': {
                    bgcolor: '#E8F5E9',
                    color: theme.vd.palette.statusActive,
                    border: `1px solid ${theme.vd.palette.statusActive} !important`,
                    '&:hover': { bgcolor: '#E8F5E9' },
                  },
                  '&[value="MEDIUM"]': {
                    bgcolor: '#FFF9E6',
                    color: theme.palette.warning.main,
                    border: `1px solid ${theme.palette.warning.main} !important`,
                    '&:hover': { bgcolor: '#FFF9E6' },
                  },
                  '&[value="HARD"]': {
                    bgcolor: '#FFEBEE',
                    color: theme.palette.error.main,
                    border: `1px solid ${theme.palette.error.main} !important`,
                    '&:hover': { bgcolor: '#FFEBEE' },
                  },
                },
              },
            }}
          >
            <ToggleButton value="EASY">Easy</ToggleButton>
            <ToggleButton value="MEDIUM">Medium</ToggleButton>
            <ToggleButton value="HARD">Hard</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Question Type Selection */}
        {showQuestionType && (
          <Box sx={{ mb: { md: '12px', lg: '20px' } }}>
            {/* Label row — arrows are only rendered on md */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: { md: '6px', lg: '8px' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { md: '14px', lg: '16px' },
                  lineHeight: { md: '18px', lg: '20px' },
                  color: theme.palette.text.primary,
                }}
              >
                {questionTypeLabel}
              </Typography>

              {/* Pagination arrows — visible only on md */}
              {isMd && totalTypePages > 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconButton
                    size="small"
                    disabled={!canGoPrev}
                    onClick={() => setCurrentTypePage((p) => p - 1)}
                    sx={arrowBtnSx(canGoPrev)}
                    aria-label="Previous question types"
                  >
                    <ChevronLeftIcon sx={{ fontSize: '14px' }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    disabled={!canGoNext}
                    onClick={() => setCurrentTypePage((p) => p + 1)}
                    sx={arrowBtnSx(canGoNext)}
                    aria-label="Next question types"
                  >
                    <ChevronRightIcon sx={{ fontSize: '14px' }} />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gridTemplateRows: { md: 'repeat(2, minmax(36px, auto))' },
                alignContent: 'start',
                gap: '8px',
                minHeight: { md: '88px' },
              }}
            >
              {visibleTypes.map((type) => (
                <Box
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: { md: '7px 10px', lg: '12px 10px' },
                    borderRadius: { md: '10px', lg: '12px' },
                    border: `1px solid ${theme.palette.grey[300]}`,
                    backgroundColor: theme.palette.common.white,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Radio
                    checked={selectedType === type.id}
                    value={type.id}
                    sx={{
                      padding: 0,
                      marginRight: '12px',
                      color: theme.vd.palette.borderMuted,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { md: '12px', lg: '16px' },
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
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: { md: '10px', lg: '16px' },
            mt: { md: '12px', lg: '20px' },
          }}
        >
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
              borderRadius: { md: '10px', lg: '12px' },
              padding: { md: '9px 14px', lg: '13px 24px' },
              textTransform: 'none',
              '&:hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.vd.palette.surfaceMuted,
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
              borderRadius: { md: '10px', lg: '12px' },
              padding: { md: '9px 14px', lg: '13px 24px' },
              lineHeight: '16px',
              color: theme.palette.common.white,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              '&:disabled': {
                backgroundColor: theme.palette.grey[400],
                color: theme.palette.common.white,
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
