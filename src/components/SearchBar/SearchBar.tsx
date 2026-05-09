import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, OutlinedInput } from '@mui/material'
import { memo } from 'react'
import './SearchBar.css'

export type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  ariaLabel?: string
}

function SearchBarComponent({
  value,
  onChange,
  placeholder = 'Search…',
  id,
  ariaLabel = 'Search',
}: SearchBarProps) {
  return (
    <OutlinedInput
      id={id}
      size="small"
      className="ui-searchbar-input"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      inputProps={{ 'aria-label': ariaLabel }}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fontSize="small" className="ui-searchbar-icon" />
        </InputAdornment>
      }
    />
  )
}

export const SearchBar = memo(SearchBarComponent)
