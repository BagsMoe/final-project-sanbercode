'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date
  onChange?: (date?: Date) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToday = () => {
    if (onChange) {
      onChange(new Date())
    }
    setIsOpen(false)
  }

  const handleClear = () => {
    if (onChange) {
      onChange(undefined)
    }
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
         
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (onChange) {
              onChange(date)
            }
            setIsOpen(false)
          }}
          initialFocus
        />
        <div className="flex justify-between p-2 border-t">
          <Button variant="ghost" onClick={handleToday}>
            Today
          </Button>
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
