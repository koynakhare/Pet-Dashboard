import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, OutlinedInput } from '@mui/material'
import { memo } from 'react'
import './PetSearchBar.css'

type PetSearchBarProps = {
  value: string
  onChange: (value: string) => void
}

function PetSearchBarComponent({ value, onChange }: PetSearchBarProps) {
  return (
    <OutlinedInput
      size="small"
      className="gallery-searchbar-input"
      placeholder="Search pets by title or description..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      }
    />
  )
}

export const PetSearchBar = memo(PetSearchBarComponent)
