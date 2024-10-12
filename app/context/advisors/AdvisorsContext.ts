'use client'

import { PlacesContextProps } from '@/app/types'
import { createContext } from 'react'

export const AdvisorsContext = createContext<PlacesContextProps>({} as PlacesContextProps)