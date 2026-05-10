import { SearchBar } from '@/components/SearchBar'
import { SelectionToolbar } from '@/components/SelectionToolbar'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SelectAllIcon from '@mui/icons-material/SelectAll'
import { Box, Chip, FormControlLabel, MenuItem, Paper, Select, Stack, Switch } from '@mui/material'
import dayjs from 'dayjs'
import map from 'lodash/map'
import { memo } from 'react'
import './PetToolbar.css'

type SortValue = 'newest' | 'oldest' | 'name-asc' | 'name-desc'

type PetToolbarProps = {
  query: string
  sortBy: SortValue
  selectedCount: number
  favoritesOnly: boolean
  totalCount: number
  onQueryChange: (value: string) => void
  onSortChange: (value: SortValue) => void
  onFavoritesToggle: (value: boolean) => void
  onSelectAll: () => void
  onClearSelection: () => void
}

const SORT_OPTIONS: Array<{ value: SortValue; label: string }> = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
]

function PetToolbarComponent({
  query,
  sortBy,
  selectedCount,
  favoritesOnly,
  totalCount,
  onQueryChange,
  onSortChange,
  onFavoritesToggle,
  onSelectAll,
  onClearSelection,
}: PetToolbarProps) {
  const selectionActions = [
    {
      id: 'select-all',
      label: 'Select all',
      icon: <SelectAllIcon fontSize="small" />,
      onClick: onSelectAll,
    },
    {
      id: 'clear',
      label: 'Clear',
      icon: <ClearAllIcon fontSize="small" />,
      onClick: onClearSelection,
      disabled: selectedCount === 0,
    },
  ]

  return (
    <Paper elevation={0} className="gallery-toolbar-root">
      <Stack spacing={2}>
        <div className="gallery-toolbar-row gallery-toolbar-row-main">
          <SearchBar
            id="pets-gallery-search"
            value={query}
            onChange={onQueryChange}
            placeholder="Search pets by title or description…"
            ariaLabel="Search pets gallery"
          />
          <Select
            size="small"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortValue)}
            className="gallery-toolbar-select"
            aria-label="Sort pets by date or title"
          >
            {map(SORT_OPTIONS, (option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            className="gallery-toolbar-favorites"
            control={
              <Switch
                checked={favoritesOnly}
                onChange={(event) => onFavoritesToggle(event.target.checked)}
              />
            }
            label={
              <Stack direction="row" spacing={0.5} className="gallery-toolbar-favorites-label">
                <FilterAltIcon fontSize="small" />
                <span>Favorites</span>
              </Stack>
            }
          />
          <Box className="gallery-toolbar-spacer" />
          <Chip
            label={dayjs().format('DD MMM, YYYY')}
            variant="outlined"
            className="gallery-toolbar-date-chip"
          />
        </div>
        <SelectionToolbar summary={`${totalCount} curated assets`} actions={selectionActions} />
      </Stack>
    </Paper>
  )
}

export const PetToolbar = memo(PetToolbarComponent)
