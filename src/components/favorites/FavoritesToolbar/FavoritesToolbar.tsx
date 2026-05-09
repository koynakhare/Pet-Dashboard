import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SortRoundedIcon from '@mui/icons-material/SortRounded'
import {
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import map from 'lodash/map'
import type { PetSortOption } from '@/hooks/usePets'
import './FavoritesToolbar.css'

export type FavoritesToolbarProps = {
  query: string
  onQueryChange: (value: string) => void
  sortBy: PetSortOption
  onSortChange: (value: PetSortOption) => void
  tagFilter: string
  tagOptions: string[]
  onTagChange: (value: string) => void
  onClearFilters: () => void
  filtersActive: boolean
  onClearAllFavorites: () => void
  clearAllDisabled: boolean
}

const SORT_ITEMS: { id: PetSortOption; label: string }[] = [
  { id: 'newest', label: 'Newest saved' },
  { id: 'oldest', label: 'Oldest saved' },
  { id: 'name-asc', label: 'Name A → Z' },
  { id: 'name-desc', label: 'Name Z → A' },
]

const TOOLBAR_ICONS = [
  { id: 'search', label: 'Search', icon: <SearchRoundedIcon fontSize="small" /> },
  { id: 'sort', label: 'Sort', icon: <SortRoundedIcon fontSize="small" /> },
  { id: 'filter', label: 'Filter tags', icon: <FilterListRoundedIcon fontSize="small" /> },
]

export function FavoritesToolbar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  tagFilter,
  tagOptions,
  onTagChange,
  onClearFilters,
  filtersActive,
  onClearAllFavorites,
  clearAllDisabled,
}: FavoritesToolbarProps) {
  return (
    <div className="favorites-toolbar glass-surface anim-fade-in">
      <div className="favorites-toolbar-heading">
        <Typography component="h2" className="favorites-toolbar-title">
          Refine your collection
        </Typography>
        <Typography component="p" className="favorites-toolbar-sub">
          Search, sort, and slice your favorites like a premium gallery tool.
        </Typography>
        <ul className="favorites-toolbar-legend" aria-hidden="true">
          {map(TOOLBAR_ICONS, (item) => (
            <li key={item.id} className="favorites-toolbar-legend-item">
              <span className="favorites-toolbar-legend-icon">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="favorites-toolbar-controls">
        <TextField
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search titles, tags, notes…"
          fullWidth
          className="favorites-toolbar-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon className="favorites-toolbar-input-icon" />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'aria-label': 'Search favorites' }}
        />

        <FormControl className="favorites-toolbar-field">
          <InputLabel id="favorites-sort-label">Sort</InputLabel>
          <Select
            labelId="favorites-sort-label"
            label="Sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as PetSortOption)}
          >
            {map(SORT_ITEMS, (item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="favorites-toolbar-field">
          <InputLabel id="favorites-tag-label">Tag</InputLabel>
          <Select
            labelId="favorites-tag-label"
            label="Tag"
            value={tagFilter || ''}
            onChange={(e) => onTagChange(String(e.target.value))}
          >
            <MenuItem value="">All tags</MenuItem>
            {map(tagOptions, (tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="favorites-toolbar-tag-chips" role="group" aria-label="Quick tag filters">
        <Chip
          label="All tags"
          className={`favorites-toolbar-chip${tagFilter === '' ? ' favorites-toolbar-chip--active' : ''}`}
          onClick={() => onTagChange('')}
        />
        {map(tagOptions, (tag) => (
          <Chip
            key={tag}
            label={tag}
            className={`favorites-toolbar-chip${tagFilter === tag ? ' favorites-toolbar-chip--active' : ''}`}
            onClick={() => onTagChange(tag)}
          />
        ))}
      </div>

      <div className="favorites-toolbar-actions">
        {map(
          [
            {
              id: 'clear-filters',
              label: 'Clear filters',
              icon: <ClearAllRoundedIcon />,
              onClick: onClearFilters,
              disabled: !filtersActive,
              variant: 'outlined' as const,
            },
            {
              id: 'clear-all',
              label: 'Clear all favorites',
              icon: <DeleteSweepRoundedIcon />,
              onClick: onClearAllFavorites,
              disabled: clearAllDisabled,
              variant: 'contained' as const,
            },
          ],
          (action) => (
            <Button
              key={action.id}
              variant={action.variant}
              color={action.id === 'clear-all' ? 'error' : 'inherit'}
              startIcon={action.icon}
              onClick={action.onClick}
              disabled={action.disabled}
              className={
                action.id === 'clear-all'
                  ? 'favorites-toolbar-action favorites-toolbar-action--danger'
                  : 'favorites-toolbar-action'
              }
            >
              {action.label}
            </Button>
          ),
        )}
      </div>
    </div>
  )
}
