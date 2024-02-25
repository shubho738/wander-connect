
import {useMemo} from 'react'
import {formatDistanceToNow, format} from 'date-fns'


export const getTimeDistance = (dateString: string) => {

  const timeDistance = useMemo(() => {
    if (!dateString) return null

    const date = new Date(dateString)
    return formatDistanceToNow(date)

  }, [dateString])

  return timeDistance
}


export const getFormattedMonthYear = (dateString: string) => {

  const formattedDate = useMemo(() => {
    if (!dateString) return null

    return format(new Date(dateString), 'MMMM yyyy')
  }, [dateString])

  return formattedDate
}


export const getDateAbbreviated = (dateString: string) => {

  if (!dateString) return null

  return format(new Date(dateString), 'MMM d')
}


export const getLongDate = (dateString: string)=> {

  const date = new Date(dateString)

  const formattedDate = format(date, 'MMMM d, yyyy')

  return formattedDate
}