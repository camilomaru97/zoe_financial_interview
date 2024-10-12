'use client'

import { useMemo, useState } from 'react'

interface Props {
  totalItems: number
  itemsPerPage: number
}

const usePagination = ({ totalItems, itemsPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return {
    currentPage,
    totalPages,
    handlePageChange,
  }
}

export default usePagination